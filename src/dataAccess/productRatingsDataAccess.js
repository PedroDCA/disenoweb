import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import database from '../database/firebase';

const productRating = "ProductRating";

/**
 * Saves a new productRating information into the database.
 * @param {Object} productRating Information to be saved on the database.
 * @returns A promise about the save transaction.
 */

export const addProductRatingAsync = async (productRating) => {
    try {
        const productRatingCollection = collection(database, productRating);
        const docRef = await addDoc(productRatingCollection, productRating);
        console.log('Document written with ID: ', docRef.id);
        return docRef; // Optionally, you can return the document reference
    } catch (error) {
        console.error('Error adding document: ', error);
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
        const productRatingDocRef = doc(collection(database, productRating), productRatingId);
        await deleteDoc(productRatingDocRef);
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

/**
 * Updates productRating information in the database.
 * @param {string} productRatingId ID of the productRating to be updated.
 * @param {Object} updatedproductRatingInfo New information to be updated for the productRating.
 * @returns A promise about the update transaction.
 */
export const updateProductRatingAsync = async (productRatingId, updatedproductRatingInfo) => {
    try {
        const productRatingDocRef = doc(collection(database, productRating), productRatingId);
        await updateDoc(productRatingDocRef, updatedproductRatingInfo);
        console.log('Document successfully updated!');
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
};

export const getAllProductRatingsAsync = async () => {
    try {
        const result = await getDocs(query(collection(database, productRating)))
        console.log('Documents successfully found!');
        return result;
    } catch (error) {
        console.error('Error finding documents: ', error);
        throw error;
    }
};

export const getProductRatingsByProductIdAsync = async (productId) => {
    try {
        const result = await getDocs(query(collection(database, productRating), where('productId', '==', productId)));
        console.log('Documents successfully found!');
        return result.data();
    } catch (error) {
        console.error('Error finding documents: ', error);
        throw error;
    }
};