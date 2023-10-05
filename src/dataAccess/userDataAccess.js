import { collection, addDoc } from 'firebase/firestore';
import database from '../database/firebase';

/**
 * Saves a new user information into the data base.
 * @param {Object} user Information to be saved on data base.
 * @returns A promise about the save transaction.
 */
export const addUserAsync = (user) => {
    const userCollection = collection(database, 'User');
    return addDoc(userCollection, user);
}