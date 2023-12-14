import { addVendorAsync, getVendorByIdAsync, updateVendorAsync } from "../dataAccess/vendorDataAcess";
import { getVendorRatingsByVendorIdAsync } from "../dataAccess/vendorRatingsDataAccess";

/**
 * Gets the vendor name by asynchronously fetching the vendor information using the provided vendorId.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {string} The name of the vendor.
 */
export const getVendorNameByIdAsync = async(vendorId) => {
    const vendor = await getVendorByIdAsync(vendorId);
    return vendor.name;
}

/**
 * Gets the average rating for a vendor by asynchronously fetching the vendor ratings using the provided vendorId.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {number} The average rating of the vendor.
 */
export const getVendorAverageRatingAsync = async(vendorId) => {
    const vendorRatings = await getVendorRatingsByVendorIdAsync(vendorId);
    const totalRatings = vendorRatings.reduce((accummulator, vendorRating) => {
      return accummulator + Number(vendorRating.rate);
    }, 0);
    const averageRating = totalRatings/vendorRatings.length;
    return averageRating || 0;
}

/**
 * Extracts summary vendor information for display.
 * @param {object} vendor - The vendor object containing details like name and email.
 * @returns {object} Summary vendor information with name and email.
 */
export const getProfileVendorInformation = (vendor) => {
  const summaryVendor = {
      name: vendor.name,
      email: vendor.email
    }
  return summaryVendor;
}

/**
 * Gets vendor information for display on a profile page by asynchronously fetching the vendor information using the provided vendorId.
 * @param {string} vendorId - The unique identifier of the vendor.
 * @returns {object} Profile vendor information with name and email.
 */
export const getVendorInformationForProfilePageByVendorId = async (vendorId) => {
  const vendorInformation = await getVendorByIdAsync(vendorId);
  const profileVendorInformation = getProfileVendorInformation(vendorInformation);
  return profileVendorInformation;
}

export const addNewVendorAsync = async (vendorInformation) => {
    const newVendor = {
        name: vendorInformation.name,
        email: vendorInformation.email,
        uid: vendorInformation.uid
    };

    const vendor = await addVendorAsync(newVendor);
    return vendor;
}


export const updateProfileVendorInformationAsync = async (vendorId, profileInformation) => {
  await updateVendorAsync(vendorId, profileInformation);
}
