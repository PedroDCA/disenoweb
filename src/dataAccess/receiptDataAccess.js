import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import database from "../database/firebase";

const receiptCollectionName = "Receipt";

export const addReceiptAsync = async (
  totalAmount,
  userId,
  state,
  paymentId,
  date
) => {
  try {
    const receiptCollection = collection(database, receiptCollectionName);
    const docRef = await addDoc(receiptCollection, {
      totalAmount,
      userId,
      state,
      paymentId,
      date,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};

export const updateReceiptStatusByIdAsync = async (receiptId, newStatus) => {
  try {
    const productDocRef = doc(collection(database, receiptCollectionName), receiptId);
    await updateDoc(productDocRef, { state: newStatus });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
