import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import database from "../database/firebase";

const productRatingCollectionName = "ProductRating";

/**
 * Saves a new productRating information into the database.
 * @param {Object} productRating Information to be saved on the database.
 * @returns A promise about the save transaction.
 */
export const addProductRatingAsync = async (productRating) => {
  const newProductRating = {
    comment: "",
    productId: productRating.productId,
    rate: productRating.rating,
    userId: productRating.userId,
  };
  try {
    const productRatingCollection = collection(
      database,
      productRatingCollectionName
    );
    const docRef = await addDoc(productRatingCollection, newProductRating);
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};

/**
 * Deletes a productRating from the database.
 * @param {string} productRatingId ID of the productRating to be deleted.
 * @returns A promise about the delete transaction.
 */
export const deleteProductRatingAsync = async (productRatingId) => {
  try {
    const productRatingDocRef = doc(
      collection(database, productRatingCollectionName),
      productRatingId
    );
    await deleteDoc(productRatingDocRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

/**
 * Updates productRating information in the database.
 * @param {string} productRatingId ID of the productRating to be updated.
 * @param {Object} updatedproductRatingInfo New information to be updated for the productRating.
 * @returns A promise about the update transaction.
 */
export const updateProductRatingAsync = async (
  productRatingId,
  updatedproductRatingInfo
) => {
  try {
    const productRatingDocRef = doc(
      collection(database, productRatingCollectionName),
      productRatingId
    );
    await updateDoc(productRatingDocRef, updatedproductRatingInfo);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

/**
 * Retrieves all product ratings asynchronously.
 * @returns {Array} An array of product ratings with additional IDs.
 * @throws {Error} If there is an error finding documents.
 */
export const getAllProductRatingsAsync = async () => {
  try {
    const result = await getDocs(
      query(collection(database, productRatingCollectionName))
    );
    const productRatingList = result.docs.map((firebaseProductRating) => {
      const id = firebaseProductRating.id;
      return { ...firebaseProductRating.data(), id };
    });
    console.log("Documents successfully found!");
    return productRatingList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

/**
 * Retrieves product ratings for a specific product ID asynchronously.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Array} An array of product ratings with additional IDs.
 * @throws {Error} If there is an error finding documents.
 */
export const getProductRatingsByProductIdAsync = async (productId) => {
  try {
    const result = await getDocs(
      query(
        collection(database, productRatingCollectionName),
        where("productId", "==", productId)
      )
    );
    const productRatingList = result.docs.map((firebaseProductRating) => {
      const id = firebaseProductRating.id;
      return { ...firebaseProductRating.data(), id };
    });
    console.log("Documents successfully found!");
    return productRatingList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};
