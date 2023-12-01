import { addUserAsync, getUserByIdAsync } from "../dataAccess/userDataAccess";

/**
 * Manages the user information to be saved.
 * @param {Object} userInformation The information related to the user.
 * @returns The user information saved.
 */
export const addNewUserAsync = async (userInformation) => {
    const newUser = {
        name: userInformation.name,
        lastName: userInformation.lastName,
        email: userInformation.email,
        uid: userInformation.uid,
        phone: userInformation.phone
    };

    const user = await addUserAsync(newUser);
    return user;
}

/**
 * Extracts summary user information for display.
 * @param {Object} user - The user object containing details like name, last name, phone number, and email.
 * @returns {Object} Summary user information with name, last name, phone number, and email.
 */
export const getProfileUserInformation = (user) => {
    const summaryUser = {
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phone,
        email: user.email
      }
    return summaryUser;
}

/**
 * Gets user information for display on a profile page by asynchronously fetching the user information using the provided userId.
 * @param {string} userId - The unique identifier of the user.
 * @returns {Object} Profile user information with name, last name, phone number, and email.
 */
export const getUserInformationForProfilePageByUserId = async (userId) => {
    const userInformation = await getUserByIdAsync(userId);
    const profileUserInformation = getProfileUserInformation(userInformation);
    return profileUserInformation;
}