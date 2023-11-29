import { addPaymentOption } from "../dataAccess/paymentDataAccess";
import { addProductBought } from "../dataAccess/productDataAccess";
import { addReceipt } from "../dataAccess/receiptDataAccess";

const createPaymentAsync = async (type) => {
  const payment = await addPaymentOption(type);
  return payment.id;
};

const createNewReceiptAsync = async (totalAmount, userId, paymentId) => {
  const initialState = "pending";
  const receiptInformation = await addReceipt(
    totalAmount,
    userId,
    initialState,
    paymentId
  );

  return receiptInformation.id;
};

const addPaidProducts = (paidProducts, receiptId) => {
  paidProducts.map((product) =>
    addProductBought(product.id, product.amount, receiptId)
  );
};

export const completePaymentOrderAsync = async (
  userId,
  paymentInformation,
  productList
) => {
  const paymentId = await createPaymentAsync(paymentInformation.type);
  const totalAmount = productList.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );
  const receiptId = await createNewReceiptAsync(totalAmount, userId, paymentId);
  addPaidProducts(productList, receiptId);
};
