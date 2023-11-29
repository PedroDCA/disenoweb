import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";
import ProfileInformationSection from "../components/profileInformationSection";
import UserOrderHistorySection from "../components/userOrderHistorySection";
import VendorOrderHistorySection from "../components/vendorOrderHistorySection";
import VendorProductList from "../components/vendorProductList";
import { getUserOrderHistoryByUserIdAsync } from "./productService";

export const fetchProfileInformation = (id, type) => {
  if (type === "user") {
    return {
      name: "Pedro",
      lastName: "Calderon",
      email: "pcalderon@gmail.com",
      phone: "",
      password: "asda",
    };
  }

  if (type === "vendor") {
    return {
      name: "Tienda",
      lastName: "Pepito",
      email: "tienda@pepito.com",
    };
  }

  return {};
};

export const fetchOrderList = (id, type) => {
  if (type === "user") {
    const userOrderList = getUserOrderHistoryByUserIdAsync(id);
    return userOrderList;
  }

  return [
    {
      totalPrice: 30000,
      status: "ready",
      imageUrl: bronceBottle,
      name: "Botella color ejemplo 750ml",
      vendor: "Nombre vendedor",
      quantity: 2,
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
      quantity: 5,
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
      quantity: 5,
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

export const fetchProductList = (profileId, profileType) => {
  if (profileType === "user") {
    return [];
  }

  if (profileType === "vendor") {
    return [
      {
        imageUrl: bronceBottle,
        price: 30000,
        name: "Botella color ejemplo 750ml",
        vendor: { name: "Nombre vendedor" },
        color: "Azul",
        storage: 300,
        labels: ["Temporada", "Oferta"],
      },
      {
        imageUrl: purpleBottle,
        price: 30000,
        name: "Botella color ejemplo 750ml",
        vendor: { name: "Nombre vendedor" },
        color: "Azul",
        storage: 300,
        labels: ["Temporada", "Oferta"],
      },
      {
        imageUrl: purpleBottle,
        name: "Botella color ejemplo 750ml",
        vendor: { name: "Nombre vendedor" },
        price: 2000,
        color: "Rojo",
        storage: 900,
        labels: ["Temporada", "Oferta"],
      },
    ];
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
