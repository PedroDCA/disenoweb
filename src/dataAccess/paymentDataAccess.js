import { addDoc, collection } from "firebase/firestore";
import database from "../database/firebase";

const paymentOptionCollectionName = "PaymentOption";

export const addPaymentOption = async (type) => {
  try {
    const paymentOptionCollection = collection(
      database,
      paymentOptionCollectionName
    );
    const docRef = await addDoc(paymentOptionCollection, {
      type,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Optionally, you can return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it elsewhere, if needed
  }
};
