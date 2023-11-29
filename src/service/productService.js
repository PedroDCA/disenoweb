import blackBottle from "../images/blackBottle.png";
import greenBottle from "../images/greenBottle.png";
import pinkBottle from "../images/pinkBottle.png";
import metalBottle from "../images/metalBottle.png";
import redBottle from "../images/redBottle.png";
import skyBottle from "../images/skyBottle.png";
import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";
import {
  getAllProductsAsync,
  getBoughtProductsByUserIdAsync,
  getProductByIdAsync,
  getProductByVendorId,
  getProductsByVendorIdAsync,
} from "../dataAccess/productDataAccess";
import { getProductRatingsByProductIdAsync } from "../dataAccess/productRatingsDataAccess";
import {
  getVendorAverageRatingAsync,
  getVendorNameByIdAsync,
} from "./vendorService";

const imageList = [
  blackBottle,
  greenBottle,
  pinkBottle,
  metalBottle,
  redBottle,
  skyBottle,
  purpleBottle,
  bronceBottle,
];

const getRandomImageUrl = () => imageList[Math.random() * imageList.length];

const getProductName = (product) =>
  `Botella ${product.color} ${product.storage}ml`;

const mapToSummaryProduct = (product) => {
  const name = getProductName(product);
  const summaryProduct = {
    name,
    id: product.id,
    imageUrl: getRandomImageUrl(),
    price: product.price,
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
const getProductAverageRatingAsync = async (productId) => {
  const productRatings = await getProductRatingsByProductIdAsync(productId);
  const totalRatings = productRatings.reduce((accummulator, productRating) => {
    return accummulator + Number(productRating.rate);
  }, 0);
  const averageRating = totalRatings / productRatings.length;
  return averageRating;
};

/**
 * Gets detailed information about a product asynchronously.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Object} Detailed information about the product.
 */
export const getProductDetailByIdAsync = async (productId) => {
  const productData = await getProductByIdAsync(productId);
  const productAverageRating = await getProductAverageRatingAsync(productId);
  const vendorAverageRating = await getVendorAverageRatingAsync(
    productData.vendorId
  );
  const vendorName = await getVendorNameByIdAsync(productData.vendorId);
  const productDetailInformation = {
    ...productData,
    averageRating: productAverageRating,
    vendorAverageRating: vendorAverageRating,
    vendorName,
  };
  return productDetailInformation;
};

const getOrderForUserHistory = (orderInformation) => {
  const order = {
    date: orderInformation.date,
    totalPrice: orderInformation.totalAmount,
    status: orderInformation.state,
    imageUrl: orderInformation.product.imageUrl,
    name: getProductName(orderInformation.product),
    vendor: orderInformation.vendor.name,
    quantity: orderInformation.amount,
    individualPrice: orderInformation.product.price,
  };

  return order;
};

export const getUserOrderHistoryByUserIdAsync = async (userId) => {
  const orderList = await getBoughtProductsByUserIdAsync(userId);
  const userOrderList = orderList.map(getOrderForUserHistory);

  return userOrderList;
};

export const getProductInformationForVendor = (product, vendorName) => {
  const summaryProduct = {
      imageUrl: product.imageUrl,
      name: getProductName(product),
      availability: product.availability,
      color: product.color,
      storage: product.storage,
      price: product.price,
      vendorName
    }
  return summaryProduct;
}

export const getAllProductsByVendorIdAsync = async(vendorId) => {
  const vendorName = await getVendorNameByIdAsync(vendorId);
  const products = await getProductsByVendorIdAsync(vendorId);
  const productsInformationForVendor = products.map((productInformation) => getProductInformationForVendor(productInformation, vendorName));
  return productsInformationForVendor;
}
