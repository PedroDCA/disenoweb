import {
  getProductBoughtByIdAsync,
  getProductByIdAsync,
  updateProductBoughtAsync,
} from "../dataAccess/productDataAccess";
import { addProductRatingAsync } from "../dataAccess/productRatingsDataAccess";
import { addVendorRatingAsync } from "../dataAccess/vendorRatingsDataAccess";

export const addNewProductRatingAsync = async (productBoughtId, userId, rating) => {
  const { productId, id } = await getProductBoughtByIdAsync(productBoughtId);
  const productRatingInformation = {
    productId,
    userId,
    rating,
  };

  await addProductRatingAsync(productRatingInformation);
  await updateProductBoughtAsync(id, { isProductRated: true });
  return true;
};

export const addNewVendorRatingAsync = async (productBoughtId, userId, rating) => {
  const { productId, id } = await getProductBoughtByIdAsync(productBoughtId);
  const { vendorId } = await getProductByIdAsync(productId);
  const productRatingInformation = {
    vendorId,
    userId,
    rating,
  };

  await addVendorRatingAsync(productRatingInformation);
  await updateProductBoughtAsync(id, { isVendorRated: true });
  return true;
};
