import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import database from '../database/firebase';

const vendorRating = "vendorRating";

/**
 * Saves a new vendorRating information into the database.
 * @param {Object} vendorRating Information to be saved on the database.
 * @returns A promise about the save transaction.
 */

export const addVendorRatingAsync = async (vendorRating) => {
    try {
        const vendorRatingCollection = collection(database, vendorRating);
        const docRef = await addDoc(vendorRatingCollection, vendorRating);
        console.log('Document written with ID: ', docRef.id);
        return docRef; // Optionally, you can return the document reference
    } catch (error) {
        console.error('Error adding document: ', error);
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
        const vendorRatingDocRef = doc(collection(database, vendorRating), vendorRatingId);
        await deleteDoc(vendorRatingDocRef);
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

/**
 * Updates vendorRating information in the database.
 * @param {string} vendorRatingId ID of the vendorRating to be updated.
 * @param {Object} updatedvendorRatingInfo New information to be updated for the vendorRating.
 * @returns A promise about the update transaction.
 */
export const updateVendorRatingAsync = async (vendorRatingId, updatedvendorRatingInfo) => {
    try {
        const vendorRatingDocRef = doc(collection(database, vendorRating), vendorRatingId);
        await updateDoc(vendorRatingDocRef, updatedvendorRatingInfo);
        console.log('Document successfully updated!');
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
};

export const getAllVendorRatingsAsync = async () => {
    try {
        const result = await getDocs(query(collection(database, vendorRating)))
        console.log('Documents successfully found!');
        return result;
    } catch (error) {
        console.error('Error finding documents: ', error);
        throw error;
    }
};

export const getVendorRatingsByVendorIdAsync = async (vendorId) => {
    try {
        const result = await getDocs(query(collection(database, vendorRating), where('vendorId', '==', vendorId)));
        console.log('Documents successfully found!');
        return result.data();
    } catch (error) {
        console.error('Error finding documents: ', error);
        throw error;
    }
};