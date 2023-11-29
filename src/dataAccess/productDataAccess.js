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
export const updateProductAsync = async (productId, updatedProductInfo) => {
  try {
    const productDocRef = doc(
      collection(database, productCollectionName),
      productId
    );
    await updateDoc(productDocRef, updatedProductInfo);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

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

export const getReceiptsByUserIdAsync = async (userId) => {
  const allReceipts = await getDocs(
    query(
      collection(database, receiptCollectionName),
      where("userId", "==", userId)
    )
  );
  const receiptList = allReceipts.docs.map((receipt) => {
    const id = receipt.id;
    return { ...receipt.data(), id };
  });

  return receiptList;
};

export const getBaseBoughtProductsByReceiptIdAsync = async (receiptId) => {
  try {
    const result = await getDocs(
      query(
        collection(database, productBoughtCollectionName),
        where("receiptId", "==", receiptId)
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

export const getBoughtProductsByUserIdAsync = async (userId) => {
  const receiptId = await getReceiptsByUserIdAsync(userId);
  const baseBoughtProducts = await getBaseBoughtProductsByReceiptIdAsync(
    receiptId
  );
  const boughtProducts = baseBoughtProducts.map(async (baseBoughtProduct) => {
    const productInformation = await getProductByIdAsync(baseBoughtProduct);
    const vendorInformation = await getVendorByIdAsync(productInformation.id);
    return {
      ...baseBoughtProduct,
      product: productInformation,
      vendor: vendorInformation,
    };
  });

  return Promise.all([boughtProducts]);
};
