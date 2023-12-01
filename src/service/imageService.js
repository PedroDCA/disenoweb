import { Cloudinary } from "@cloudinary/url-gen";

const cloudinaryImageUrl =
  "https://api.cloudinary.com/v1_1/dta9nz7nw/image/upload";
const uploadPreset = "kksfotwo";

const uploadImageAsync = async (image, name) => {
  const form = new FormData();
  form.append("file", image);
  form.append("upload_preset", uploadPreset);
  form.append("public_id", name);

  await fetch(cloudinaryImageUrl, {
    body: form,
    method: "POST",
  });
};

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dta9nz7nw",
    apiKey: "225114276395323",
    apiSecret: "YxkftxfahJxacc_RO-8e3EIwZ1k",
  },
});

export const uploadProductImage = (image, productId) => {
  uploadImageAsync(image, productId);
};

export const getProductImage = (productId) => cloudinary.image(productId).toURL();
