import { addUserAsync } from "../dataAccess/userDataAccess";

/**
 * Manages the user information to be saved.
 * @param {Object} userInformation The information related to the user.
 * @returns The user information saved.
 */
export const addNewUserAsync = async (userInformation) => {
    const newUser = {
        Name: userInformation.name,
        LastName: userInformation.lastName,
        Email: userInformation.email,
        Password: userInformation.password
    };

    const user = await addUserAsync(newUser);
    return user;
}