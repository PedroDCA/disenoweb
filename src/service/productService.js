import {
  addProductAsync,
  getAllProductsAsync,
  getBoughtProductsByUserIdAsync,
  getProductByIdAsync,
  getProductsByVendorIdAsync,
  getReceiptProductsByVendorIdAsync,
  updateProductAsync,
} from "../dataAccess/productDataAccess";
import { getProductRatingsByProductIdAsync } from "../dataAccess/productRatingsDataAccess";
import {
  getVendorAverageRatingAsync,
  getVendorNameByIdAsync,
} from "./vendorService";
import { getProductImage, uploadProductImage } from "./imageService";

export const addNewProductAsync = async (productInformation, vendorId) => {
  const newProduct = {
    color: productInformation.color,
    details: productInformation.details,
    material: productInformation.material,
    price: productInformation.price,
    storage: productInformation.storage,
    vendorId: vendorId,
    isActivated: true,
  };

  const product = await addProductAsync(newProduct);
  await uploadProductImage(productInformation.image, product.id);

  return product.id;
};

const getProductName = (product) =>
  `Botella ${product.color} ${product.storage}ml`;

const mapToSummaryProduct = (product) => {
  const name = getProductName(product);
  const summaryProduct = {
    name,
    id: product.id,
    imageUrl: getProductImage(product.id),
    price: product.price,
    vendorId: product.vendorId,
  };
  return summaryProduct;
};

/**
 * Gets a list of summary products asynchronously.
 * @returns {Array} List of summary products.
 */
export const getSummaryProductListAsync = async () => {
  const products = await getAllProductsAsync();
  const summaryProducts = products.map(mapToSummaryProduct);
  return summaryProducts;
};

/**
 * Formats a product list for the search page by adding a flag indicating whether the product can be added to the cart.
 * @param {Array} productList - List of products.
 * @param {Array} cartItemIdList - List of cart item IDs.
 * @returns {Array} Formatted product list.
 */
export const formatProductListForSearchPage = (productList, cartItemIdList) => {
  const searchProductList = productList.map((product) => {
    const isProductOnCart = cartItemIdList.some(
      (itemId) => itemId === product.id
    );
    product.ableToAddCard = !isProductOnCart;

    return product;
  });

  return searchProductList;
};

/**
 * Formats a product for the detail page by adding a flag indicating whether the product can be added to the cart.
 * @param {Object} product - Product information.
 * @param {Array} cartItemIdList - List of cart item IDs.
 * @returns {Object} Formatted product.
 */
export const formatProductForDetailPage = (product, cartItemIdList) => {
  const isProductOnCart = cartItemIdList.some(
    (itemId) => itemId === product.id
  );
  product.ableToAddCard = !isProductOnCart;

  return product;
};

/**
 * Gets the average rating for a product asynchronously.
 * @param {string} productId - The unique identifier of the product.
 * @returns {number} The average rating of the product.
 */
const getProductAverageRatingInformationAsync = async (productId) => {
  const productRatings = await getProductRatingsByProductIdAsync(productId);
  const reviewQuantity = productRatings.length;
  const totalRatings = productRatings.reduce((accummulator, productRating) => {
    return accummulator + Number(productRating.rate);
  }, 0);
  const averageRating = totalRatings / reviewQuantity || 0;
  return { averageRating, reviewQuantity };
};

/**
 * Gets detailed information about a product asynchronously.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Object} Detailed information about the product.
 */
export const getProductDetailByIdAsync = async (productId) => {
  const productData = await getProductByIdAsync(productId);
  const { averageRating, reviewQuantity } = await getProductAverageRatingInformationAsync(
    productId
  );
  const vendorAverageRating = await getVendorAverageRatingAsync(
    productData.vendorId
  );
  const vendorName = await getVendorNameByIdAsync(productData.vendorId);
  const productDetailInformation = {
    ...productData,
    imageUrl: getProductImage(productId),
    averageRating,
    reviewQuantity,
    vendorAverageRating: vendorAverageRating,
    vendorName,
  };
  return productDetailInformation;
};

const getOrderForUserHistory = (orderInformation) => {
  const order = {
    date: orderInformation.date,
    totalPrice: getTotalPrice(
      orderInformation.amount,
      orderInformation.product.price
    ),
    status: orderInformation.state,
    imageUrl: getProductImage(orderInformation.product.id),
    name: getProductName(orderInformation.product),
    vendor: orderInformation.vendor.name,
    amount: orderInformation.amount,
    individualPrice: orderInformation.product.price,
    isProductRated: orderInformation.isProductRated || false,
    isVendorRated: orderInformation.isVendorRated || false,
    id: orderInformation.id,
  };

  return order;
};

const getVendorProductCardInformation = (productOrder) => {
  const order = {
    imageUrl: getProductImage(productOrder.product.id),
    name: getProductName(productOrder.product),
    price: productOrder.product.price,
    color: productOrder.product.color,
    storage: productOrder.product.storage,
  };

  return order;
};

export const getUserOrderHistoryByUserIdAsync = async (userId) => {
  const orderList = await getBoughtProductsByUserIdAsync(userId);
  const userOrderList = orderList.map(getOrderForUserHistory);

  return userOrderList;
};

export const getVendorOrderHistoryByVendorIdAsync = async (vendorId) => {
  const orderList = await getReceiptProductsByVendorIdAsync(vendorId);
  const vendorOrderList = orderList.map((order) => ({
    ...order,
    products: order.products.map(getVendorProductCardInformation),
  }));

  return vendorOrderList;
};

export const getProductInformationForVendor = (product, vendorName) => {
  const summaryProduct = {
    imageUrl: getProductImage(product.id),
    name: getProductName(product),
    availability: product.availability,
    color: product.color,
    storage: product.storage,
    price: product.price,
    vendorName,
    details: product.details,
    material: product.material,
    id: product.id,
    isActivated: product.isActivated,
  };
  return summaryProduct;
};

export const getAllProductsByVendorIdAsync = async (vendorId) => {
  const vendorName = await getVendorNameByIdAsync(vendorId);
  const products = await getProductsByVendorIdAsync(vendorId);
  const productsInformationForVendor = products.map((productInformation) =>
    getProductInformationForVendor(productInformation, vendorName)
  );
  return productsInformationForVendor;
};

export const getTotalPrice = (itemQuantity, price) => itemQuantity * price;

export const updateProductInformationAsync = async (productInformation) => {
  await updateProductAsync(productInformation.id, productInformation);
  return true;
};

export const toggleProductActivation = async (productInformation) => {
  await updateProductAsync(productInformation.id, {
    ...productInformation,
    isActivated: !productInformation.isActivated,
  });
  return true;
};
