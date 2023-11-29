import { collection, addDoc } from "firebase/firestore";
import database from "../database/firebase";

const receiptCollectionName = "Product";

export const addReceipt = async (totalAmount, userId, state, paymentId) => {
  try {
    const receiptCollection = collection(database, receiptCollectionName);
    const docRef = await addDoc(receiptCollection, {
      totalAmount,
      userId,
      state,
      paymentId,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};
