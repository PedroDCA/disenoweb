import { addUserAsync } from "../dataAccess/userDataAccess";

/**
 * Manages the user information to be saved.
 * @param {Object} userInformation The information related to the user.
 * @returns The user information saved.
 */
export const addNewUser = async (userInformation) => {
    const newUser = {
        name: userInformation.name,
        lastName: userInformation.lastName,
        email: userInformation.email,
        password: userInformation.password
    };

    const user = await addUserAsync(newUser);
    return user;
}