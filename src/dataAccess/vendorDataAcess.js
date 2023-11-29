import { collection, addDoc, deleteDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import database from '../database/firebase';

const vendorCollectionName = "Vendor";

/**
 * Saves a new Vendor information into the database.
 * @param {Object} vendor Information to be saved on the database.
 * @returns A promise about the save transaction.
 */
export const addVendorAsync = async (vendor) => {
    try {
        const VendorCollection = collection(database, vendorCollectionName);
        const docRef = await addDoc(VendorCollection, vendor);
        console.log('Document written with ID: ', docRef.id);
        return docRef; // Optionally, you can return the document reference
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error; // Rethrow the error to handle it elsewhere, if needed
    }
};

/**
 * Deletes a Vendor from the database.
 * @param {string} vendorId ID of the vendor to be deleted.
 * @returns A promise about the delete transaction.
 */
export const deleteVendorAsync = async (vendorId) => {
    try {
        const vendorDocRef = doc(collection(database, vendorCollectionName), vendorId);
        await deleteDoc(vendorDocRef);
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

/**
 * Updates Vendor information in the database.
 * @param {string} vendorId ID of the vendor to be updated.
 * @param {Object} updatedVendorInfo New information to be updated for the Vendor.
 * @returns A promise about the update transaction.
 */
export const updateVendorAsync = async (vendorId, updatedVendorInfo) => {
    try {
        const vendorDocRef = doc(collection(database, vendorCollectionName), vendorId);
        await updateDoc(vendorDocRef, updatedVendorInfo);
        console.log('Document successfully updated!');
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
};

/**
 * Retrieves vendor information by ID asynchronously.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {Object} Vendor information with an additional ID.
 * @throws {Error} If there is an error finding the document.
 */
export const getVendorByIdAsync = async (vendorId) => {
    try {
        const result = await getDoc(doc(collection(database, vendorCollectionName), vendorId));
        const id = result.id;
        console.log('Documents successfully found!');
        return {...result.data(), id};
    } catch (error) {
        console.error('Error finding documents: ', error);
        throw error;
    }
};