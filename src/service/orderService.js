import { updateReceiptStatusByIdAsync } from "../dataAccess/receiptDataAccess"

export const updateOrderStatusAsync = async (orderId, newStatus) => {
    await updateReceiptStatusByIdAsync(orderId, newStatus);

    return true;
}