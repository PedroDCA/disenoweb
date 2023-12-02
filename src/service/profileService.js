import ProfileInformationSection from "../components/profileInformationSection";
import UserOrderHistorySection from "../components/userOrderHistorySection";
import VendorOrderHistorySection from "../components/vendorOrderHistorySection";
import VendorProductList from "../components/vendorProductList";
import { getUserOrderHistoryByUserIdAsync, getAllProductsByVendorIdAsync, getVendorOrderHistoryByVendorIdAsync} from "./productService";
import { getUserInformationForProfilePageByUserId, updateProfileUserInformationAsync } from "./userService";
import { getVendorInformationForProfilePageByVendorId, updateProfileVendorInformationAsync } from "./vendorService";

export const fetchProfileInformationAsync = async (id, type) => {
  if (type === "user") {
    const profileInformation = await getUserInformationForProfilePageByUserId(id);
    return profileInformation;
  }

  if (type === "vendor") {
    const vendorInformation = await getVendorInformationForProfilePageByVendorId(id);
    return vendorInformation;
  }

  return {};
};

export const fetchOrderListAsync = async (id, type) => {
  if (type === "user") {
    const userOrderList = await getUserOrderHistoryByUserIdAsync(id);
    return userOrderList;
  }

  if (type === "vendor") {
    const vendorOrderList = await getVendorOrderHistoryByVendorIdAsync(id);
    return vendorOrderList;
  }

  return [];
};

export const getTabList = (profileType) => {
  if (profileType === "user") {
    return [
      { type: "profileInformation", name: "Panel Comprador" },
      { type: "userOrderHistory", name: "Historial de pedidos" },
    ];
  }

  if (profileType === "vendor") {
    return [
      { type: "profileInformation", name: "Panel Vendedor" },
      { type: "productList", name: "Productos" },
      { type: "vendorOrderHistory", name: "Pedidos" },
    ];
  }

  return [];
};

export const fetchProductListAsync = async (profileId, profileType) => {
  if (profileType === "user") {
    return [];
  }

  if (profileType === "vendor") {
    const productsInformation = await getAllProductsByVendorIdAsync(profileId);
    return productsInformation;
    
  }

  return [];
};

export const getComponentToRender = (componentType, information) => {
  if (componentType === "profileInformation") {
    return <ProfileInformationSection userInformation={information.profile} />;
  }

  if (componentType === "userOrderHistory") {
    return <UserOrderHistorySection orderList={information.orderList} />;
  }

  if (componentType === "productList") {
    return <VendorProductList productList={information.productList} />;
  }

  if (componentType === "vendorOrderHistory") {
    return <VendorOrderHistorySection orderList={information.orderList} />;
  }

  return <></>;
};

export const updateProfileAsync = async (profileId, profileType, newProfileInformation) => {
  if (profileType === "vendor") {
    await updateProfileVendorInformationAsync(profileId, newProfileInformation)
  }

  if (profileType === "user") {
    await updateProfileUserInformationAsync(profileId, newProfileInformation);
  }
}