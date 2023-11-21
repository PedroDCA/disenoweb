import { getVendorByIdAsync } from "../dataAccess/vendorDataAcess";
import { getVendorRatingsByVendorIdAsync } from "../dataAccess/vendorRatingsDataAccess";

/**
 * Gets the vendor name by asynchronously fetching the vendor information using the provided vendorId.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {string} The name of the vendor.
 */
export const getVendorNameByIdAsync = async(vendorId) => {
    const vendor = await getVendorByIdAsync(vendorId);
    return vendor.Name;
}

/**
 * Gets the average rating for a vendor by asynchronously fetching the vendor ratings using the provided vendorId.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {number} The average rating of the vendor.
 */
export const getVendorAverageRatingAsync = async(vendorId) => {
    const vendorRatings = await getVendorRatingsByVendorIdAsync(vendorId);
    const totalRatings = vendorRatings.reduce((accummulator, vendorRating) => {
      return accummulator + Number(vendorRating.Rate);
    }, 0);
    const averageRating = totalRatings/vendorRatings.length;
    return averageRating;
  }