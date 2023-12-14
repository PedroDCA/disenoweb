import {
    AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getUserByUIdAsync } from "../dataAccess/userDataAccess";
import { getVendorByUIdAsync } from "../dataAccess/vendorDataAcess";
import { addNewUserAsync } from "./userService";
import { addNewVendorAsync } from "./vendorService";
import { auth } from "../database/firebase";

export const signInProfile = async (email, password, profileType) => {
  try {
    const authentication = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = authentication.user?.uid;

    if (profileType === "user") {
      const userInformation = await getUserByUIdAsync(uid);
      if (!userInformation?.id) {
        throw new Error();
      }
      return { id: userInformation?.id, type: "user" };
    }

    if (profileType === "vendor") {
      const vendorInformation = await getVendorByUIdAsync(uid);
      if (!vendorInformation?.id) {
        throw new Error();
      }
      return { id: vendorInformation?.id, type: "vendor" };
    }

    return {};
  } catch (error) {
    return { error: "Usuario incorrecto" };
  }
};

const signUpUserProfileAsync = async (fullName, email, profileUid, phone = "") => {
  const [name, lastName] = fullName.split(" ");
  const user = await addNewUserAsync({
    name,
    lastName,
    email,
    uid: profileUid,
    phone
  });

  return user;
};

const signUpVendorProfileAsync = async (fullName, email, profileUid) => {
  const vendor = await addNewVendorAsync({
    name: fullName,
    email,
    uid: profileUid,
  });
  return vendor;
};

export const signUpProfile = async (fullName, email, password, profileType) => {
  try {
    const authentication =
      (await createUserWithEmailAndPassword(auth, email, password)) ?? {};
    const uid = authentication.user?.uid;

    if (profileType === "user") {
      const userInformation = await signUpUserProfileAsync(
        fullName,
        email,
        uid
      );
      return { id: userInformation?.id, type: "user" };
    }

    if (profileType === "vendor") {
      const vendorInformation = await signUpVendorProfileAsync(
        fullName,
        email,
        uid
      );
      return { id: vendorInformation?.id, type: "vendor" };
    }

    return {};
  } catch (error) {
    if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        return { error: "Contrasena debil" }; 
    }

    return { error: "Usuario ya existente" };;
  }
};
