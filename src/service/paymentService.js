import { addPaymentOption } from "../dataAccess/paymentDataAccess";
import { addProductBoughtAsync } from "../dataAccess/productDataAccess";
import { addReceiptAsync } from "../dataAccess/receiptDataAccess";

const createPaymentAsync = async (type) => {
  const payment = await addPaymentOption(type);
  return payment.id;
};

const createNewReceiptAsync = async (totalAmount, userId, paymentId, date) => {
  const initialState = "pending";
  const receiptInformation = await addReceiptAsync(
    totalAmount,
    userId,
    initialState,
    paymentId,
    date
  );

  return receiptInformation.id;
};

const addPaidProducts = (paidProducts, receiptId) => {
  paidProducts.map((product) =>
    addProductBoughtAsync(product.id, product.amount, receiptId)
  );
};

export const completePaymentOrderAsync = async (
  userId,
  paymentInformation,
  productList
) => {
  const vendorIdList = productList
    .map((product) => product.vendorId)
    .filter((vendorId, index, array) => array.indexOf(vendorId) === index);
  const productsByVendor = vendorIdList.map((vendorId) => productList.filter((product) => product.vendorId === vendorId));
  for (const listIndex in productsByVendor) {
    const products = productsByVendor[listIndex];
    const paymentId = await createPaymentAsync(paymentInformation.type);
    const totalAmount = products.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
    const currentDate = new Date();
    const receiptId = await createNewReceiptAsync(
      totalAmount,
      userId,
      paymentId,
      currentDate.toISOString()
    );
    addPaidProducts(products, receiptId);
  }
};
