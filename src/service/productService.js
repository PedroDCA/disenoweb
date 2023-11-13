import blackBottle from "../images/blackBottle.png";
import greenBottle from "../images/greenBottle.png";
import pinkBottle from "../images/pinkBottle.png";
import metalBottle from "../images/metalBottle.png";
import redBottle from "../images/redBottle.png";
import skyBottle from "../images/skyBottle.png";
import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";

const productList = [
  {
    id: 1,
    imageUrl: blackBottle,
    name: "Botella Negro Opaco  750ML",
    price: 15000,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 2,
    imageUrl: greenBottle,
    name: "Botella Verde Agua 750ML",
    price: 12500,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 3,
    imageUrl: pinkBottle,
    name: "Botella Rosado Pastel 750ML",
    price: 14200,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 4,
    imageUrl: metalBottle,
    name: "Botella Metálico claro 750ML",
    price: 13500,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 5,
    imageUrl: redBottle,
    name: "Botella Vino 750ML",
    price: 12500,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 6,
    imageUrl: skyBottle,
    name: "Botella Turquesa 750ML",
    price: 15000,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 7,
    imageUrl: purpleBottle,
    name: "Botella Morada 750ML",
    price: 13500,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
  {
    id: 8,
    imageUrl: bronceBottle,
    name: "Botella bronce 750ML",
    price: 14200,
    ratingAverage: 3.0,
    reviewQuantity: 30,
    vendor: {
      name: "Patitos Inc",
      ratingAverage: 4.4,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum metus quis elementum auctor. Curabitur volutpat ultricies eleifend. Mauris quis viverra enim. Donec scelerisque tellus eu ante placerat, eu lobortis",
  },
];

export const getAllProducts = () => productList;

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

export const formatProductForDetailPage = (product, cartItemIdList) => {
  const isProductOnCart = cartItemIdList.some(
    (itemId) => itemId === product.id
  );
  product.ableToAddCard = !isProductOnCart;

  return product;
};

export const getProductDetailById = (productId) =>
  productList.find((product) => product.id === Number(productId));
