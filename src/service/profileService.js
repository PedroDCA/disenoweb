import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";
import ProfileInformationSection from "../components/profileInformationSection";
import UserOrderHistorySection from "../components/userOrderHistorySection";
import VendorOrderHistorySection from "../components/vendorOrderHistorySection";
import VendorProductList from "../components/vendorProductList";
import { getUserOrderHistoryByUserIdAsync, getAllProductsByVendorIdAsync} from "./productService";
import { getUserInformationForProfilePageByUserId } from "./userService";
import { getVendorInformationForProfilePageByVendorId } from "./vendorService";

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

  return [
    {
      totalPrice: 30000,
      status: "ready",
      imageUrl: bronceBottle,
      name: "Botella color ejemplo 750ml",
      vendor: "Nombre vendedor",
      amount: 2,
      individualPrice: 15000,
      date: "2023-10-04T00:00:00",
      labels: ["Temporada", "Oferta"],
      storage: 300,
      color: "Rojo",
      address: "Desamparados, San Jose",
      id: 1,
    },
    {
      totalPrice: 10000,
      status: "sent",
      imageUrl: purpleBottle,
      name: "Botella color ejemplo 750ml",
      vendor: "Nombre vendedor",
      amount: 5,
      individualPrice: 2000,
      date: "2023-11-15T00:00:00",
      labels: ["Temporada", "Oferta"],
      storage: 300,
      color: "Rojo",
      address: "Guadalupe, San Jose",
      id: 2,
    },
    {
      totalPrice: 10000,
      status: "pending",
      imageUrl: purpleBottle,
      name: "Botella color ejemplo 750ml",
      vendor: "Nombre vendedor",
      amount: 5,
      individualPrice: 2000,
      date: "2023-11-15T00:00:00",
      labels: ["Temporada", "Oferta"],
      storage: 300,
      color: "Rojo",
      address: "Tibas, San Jose",
      id: 3,
    },
  ];
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
