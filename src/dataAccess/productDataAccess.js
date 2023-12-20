import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import database from "../database/firebase";
import { getVendorByIdAsync } from "./vendorDataAcess";

const productCollectionName = "Product";
const productBoughtCollectionName = "ProductBought";
const receiptCollectionName = "Receipt";

/**
 * Saves a new product information into the database.
 * @param {Object} product Information to be saved on the database.
 * @returns A promise about the save transaction.
 */
export const addProductAsync = async (product) => {
  try {
    const productCollection = collection(database, productCollectionName);
    const docRef = await addDoc(productCollection, product);
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};

/**
 * Deletes a product from the database.
 * @param {string} productId ID of the product to be deleted.
 * @returns A promise about the delete transaction.
 */
export const deleteProductAsync = async (productId) => {
  try {
    const productDocRef = doc(
      collection(database, productCollectionName),
      productId
    );
    await deleteDoc(productDocRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

/**
 * Updates product information in the database.
 * @param {string} productId ID of the product to be updated.
 * @param {Object} updatedproductInfo New information to be updated for the product.
 * @returns A promise about the update transaction.
 */
export const updateProductAsync = async (
  productId,
  updatedProductInformation
) => {
  const newProductInformation = {
    color: updatedProductInformation.color,
    details: updatedProductInformation.details,
    material: updatedProductInformation.material,
    price: updatedProductInformation.price,
    storage: updatedProductInformation.storage,
    isActivated: updatedProductInformation.isActivated,
  };
  try {
    const productDocRef = doc(
      collection(database, productCollectionName),
      productId
    );
    await updateDoc(productDocRef, newProductInformation);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

/**
 * Retrieves all products asynchronously.
 * @returns {Array} An array of products with additional IDs.
 * @throws {Error} If there is an error finding documents.
 */
export const getAllProductsAsync = async () => {
  try {
    const result = await getDocs(
      query(collection(database, productCollectionName))
    );
    const productList = result.docs.map((firebaseProduct) => {
      const id = firebaseProduct.id;
      return { ...firebaseProduct.data(), id };
    });
    console.log("Documents successfully found!");
    return productList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

/**
 * Retrieves a product by ID asynchronously.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Object} The product information with an additional ID.
 * @throws {Error} If there is an error finding the document.
 */
export const getProductByIdAsync = async (productId) => {
  try {
    const productDocRef = doc(
      collection(database, productCollectionName),
      productId
    );
    const result = await getDoc(productDocRef);
    const id = result.id;
    console.log("Documents successfully found!");
    return { ...result.data(), id };
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

export const getProductBoughtByIdAsync = async (productBoughtId) => {
  try {
    const productDocRef = doc(
      collection(database, productBoughtCollectionName),
      productBoughtId
    );
    const result = await getDoc(productDocRef);
    const id = result.id;
    console.log("Documents successfully found!");
    return { ...result.data(), id };
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

export const getReceiptByIdAsync = async (receiptId) => {
  try {
    const receiptDocRef = doc(
      collection(database, receiptCollectionName),
      receiptId
    );
    const result = await getDoc(receiptDocRef);
    const id = result.id;
    console.log("Documents successfully found!");
    return { ...result.data(), id };
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

export const getReceiptsByFilterAsync = async (key, value) => {
  const allReceipts = await getDocs(
    query(collection(database, receiptCollectionName), where(key, "==", value))
  );
  const receiptList = allReceipts.docs.map((receipt) => {
    const id = receipt.id;
    return { ...receipt.data(), id };
  });

  return receiptList;
};

export const getReceiptsByUserIdAsync = async (userId) =>
  await getReceiptsByFilterAsync("userId", userId);

export const getReceiptsByVendorIdAsync = async (vendorId) =>
  await getReceiptsByFilterAsync("vendorId", vendorId);

export const getBaseBoughtProductsByFilterAsync = async (key, value) => {
  try {
    const result = await getDocs(
      query(
        collection(database, productBoughtCollectionName),
        where(key, "==", value)
      )
    );
    const productBoughtList = result.docs.map((productBought) => {
      const id = productBought.id;
      return { ...productBought.data(), id };
    });
    console.log("Documents successfully found!");
    return productBoughtList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

export const getBaseBoughtProductsByReceiptIdAsync = async (receiptId) =>
  await getBaseBoughtProductsByFilterAsync("receiptId", receiptId);
export const getBaseBoughtProductsByProductIdAsync = async (productId) =>
  await getBaseBoughtProductsByFilterAsync("productId", productId);

export const getBoughtProductsByUserIdAsync = async (userId) => {
  const receipts = await getReceiptsByUserIdAsync(userId);
  const baseBoughtProductsByReceipt = await Promise.all(
    receipts.map(async (receipt) => {
      const baseBoughtProducts = await getBaseBoughtProductsByReceiptIdAsync(
        receipt.id
      );
      return baseBoughtProducts.map((baseBoughtProduct) => ({
        ...baseBoughtProduct,
        state: receipt.state,
        totalAmount: receipt.totalAmount,
        date: receipt.date,
      }));
    })
  );
  const baseBoughtProducts = baseBoughtProductsByReceipt.reduce(
    (accumulator, baseBoughtProductList) =>
      accumulator.concat(baseBoughtProductList),
    []
  );
  const boughtProducts = await Promise.all(
    baseBoughtProducts.map(async (baseBoughtProduct) => {
      const productInformation = await getProductByIdAsync(
        baseBoughtProduct.productId
      );
      const vendorInformation = await getVendorByIdAsync(
        productInformation.vendorId
      );
      return {
        ...baseBoughtProduct,
        product: productInformation,
        vendor: vendorInformation,
      };
    })
  );

  return boughtProducts;
};

export const getReceiptProductsByVendorIdAsync = async (vendorId) => {
  const products = await getProductsByVendorIdAsync(vendorId);
  const vendorInformation = await getVendorByIdAsync(vendorId);
  const boughtProductListByProduct = await Promise.all(
    products.map(async (product) => {
      const baseBoughtProducts = await getBaseBoughtProductsByProductIdAsync(
        product.id
      );
      const boughtProducts = baseBoughtProducts.map((baseBoughtProduct) => ({
        ...baseBoughtProduct,
        product,
        vendor: vendorInformation,
      }));

      return boughtProducts;
    })
  );

  const boughtProductList = boughtProductListByProduct.reduce(
    (accumulator, list) => accumulator.concat(list),
    []
  );

  const boughtProductListByReceipt = [];

  for (const boughtProduct of boughtProductList) {
    const receiptGroupIndex = boughtProductListByReceipt.findIndex(
      (receiptGroup) => receiptGroup.id === boughtProduct.receiptId
    );

    if (receiptGroupIndex > -1) {
      boughtProductListByReceipt[receiptGroupIndex].products.push(
        boughtProduct
      );
    } else {
      try {
        const receiptInformation = await getReceiptByIdAsync(
          boughtProduct.receiptId
        );
        const newReceiptGroup = {
          ...receiptInformation,
          products: [boughtProduct],
        };
        boughtProductListByReceipt.push(newReceiptGroup);
      } catch (error) {
        // Handle error fetching receipt information
        console.error("Error fetching receipt information:", error);
      }
    }
  }

  return boughtProductListByReceipt;
};

export const updateProductBoughtAsync = async (
  productBoughtId,
  productBoughtInformation
) => {
  try {
    const productBoughtDocRef = doc(
      collection(database, productBoughtCollectionName),
      productBoughtId
    );
    await updateDoc(productBoughtDocRef, productBoughtInformation);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const addProductBoughtAsync = async (productId, amount, receiptId) => {
  try {
    const productCollection = collection(database, productBoughtCollectionName);
    const docRef = await addDoc(productCollection, {
      productId,
      amount,
      receiptId,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};

export const getProductsByVendorIdAsync = async (vendorId) => {
  try {
    const result = await getDocs(
      query(
        collection(database, productCollectionName),
        where("vendorId", "==", vendorId)
      )
    );
    const productList = result.docs.map((firebaseVendorRating) => {
      const id = firebaseVendorRating.id;
      return { ...firebaseVendorRating.data(), id };
    });
    console.log("Documents successfully found!");
    return productList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

export const getSoldProductsQuantityListByVendorIdAsync = async (vendorId) => {
  const products = await getProductsByVendorIdAsync(vendorId);

  const soldProducts = await Promise.all(
    products.map(async (product) => {
      const baseBoughtProducts = await getBaseBoughtProductsByProductIdAsync(
        product.id
      );

      const totalSold = baseBoughtProducts.reduce(
        (accumulator, baseBoughtProduct) =>
          Number(baseBoughtProduct.amount) + accumulator,
        0
      );

      return { ...product, totalSold };
    })
  );

  return soldProducts;
};
