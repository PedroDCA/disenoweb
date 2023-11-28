import { collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import database from '../database/firebase';

const userCollectionName = "User";

/**
 * Saves a new user information into the database.
 * @param {Object} user Information to be saved on the database.
 * @returns A promise about the save transaction.
 */

export const addUserAsync = async (user) => {
    try {
        const userCollection = collection(database, userCollectionName);
        const docRef = await addDoc(userCollection, user);
        console.log('Document written with ID: ', docRef.id);
        return docRef; // Optionally, you can return the document reference
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error; // Rethrow the error to handle it elsewhere, if needed
    }
};

/**
 * Deletes a user from the database.
 * @param {string} userId ID of the user to be deleted.
 * @returns A promise about the delete transaction.
 */
export const deleteUserByIdAsync = async (userId) => {
    try {
        const userDocRef = doc(collection(database, userCollectionName), userId);
        await deleteDoc(userDocRef);
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

/**
 * Updates user information in the database.
 * @param {string} userId ID of the user to be updated.
 * @param {Object} updatedUserInfo New information to be updated for the user.
 * @returns A promise about the update transaction.
 */
export const updateUserByIdAsync = async (userId, updatedUserInfo) => {
    try {
        const userDocRef = doc(collection(database, userCollectionName), userId);
        await updateDoc(userDocRef, updatedUserInfo);
        console.log('Document successfully updated!');
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
};