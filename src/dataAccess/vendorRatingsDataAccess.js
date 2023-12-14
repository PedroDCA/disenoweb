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

const vendorRatingCollectionName = "VendorRating";

/**
 * Saves a new vendorRating information into the database.
 * @param {Object} vendorRating Information to be saved on the database.
 * @returns A promise about the save transaction.
 */
export const addVendorRatingAsync = async (vendorRating) => {
  const newVendorRating = {
    comment: "",
    vendorId: vendorRating.vendorId,
    rate: vendorRating.rating,
    userId: vendorRating.userId,
  };
  try {
    const vendorRatingCollection = collection(
      database,
      vendorRatingCollectionName
    );
    const docRef = await addDoc(vendorRatingCollection, newVendorRating);
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};

/**
 * Deletes a vendorRating from the database.
 * @param {string} vendorRatingId ID of the vendorRating to be deleted.
 * @returns A promise about the delete transaction.
 */
export const deleteVendorRatingAsync = async (vendorRatingId) => {
  try {
    const vendorRatingDocRef = doc(
      collection(database, vendorRatingCollectionName),
      vendorRatingId
    );
    await deleteDoc(vendorRatingDocRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

/**
 * Updates vendorRating information in the database.
 * @param {string} vendorRatingId ID of the vendorRating to be updated.
 * @param {Object} updatedvendorRatingInfo New information to be updated for the vendorRating.
 * @returns A promise about the update transaction.
 */
export const updateVendorRatingAsync = async (
  vendorRatingId,
  updatedvendorRatingInfo
) => {
  try {
    const vendorRatingDocRef = doc(
      collection(database, vendorRatingCollectionName),
      vendorRatingId
    );
    await updateDoc(vendorRatingDocRef, updatedvendorRatingInfo);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

/**
 * Retrieves all vendor ratings asynchronously.
 * @returns {Array} An array of vendor ratings with additional IDs.
 * @throws {Error} If there is an error finding documents.
 */
export const getAllVendorRatingsAsync = async () => {
  try {
    const result = await getDocs(
      query(collection(database, vendorRatingCollectionName))
    );
    const vendorRatingList = result.docs.map((firebaseVendorRating) => {
      const id = firebaseVendorRating.id;
      return { ...firebaseVendorRating.data(), id };
    });
    console.log("Documents successfully found!");
    return vendorRatingList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};

/**
 * Retrieves vendor ratings for a specific vendor ID asynchronously.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {Array} An array of vendor ratings with additional IDs.
 * @throws {Error} If there is an error finding documents.
 */
export const getVendorRatingsByVendorIdAsync = async (vendorId) => {
  try {
    const result = await getDocs(
      query(
        collection(database, vendorRatingCollectionName),
        where("vendorId", "==", vendorId)
      )
    );
    const vendorRatingList = result.docs.map((firebaseVendorRating) => {
      const id = firebaseVendorRating.id;
      return { ...firebaseVendorRating.data(), id };
    });
    console.log("Documents successfully found!");
    return vendorRatingList;
  } catch (error) {
    console.error("Error finding documents: ", error);
    throw error;
  }
};
