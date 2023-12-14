import React, { useState, useEffect } from "react";
import VendorProduct from "./vendorProduct";
import "../styles/vendorProductList.css";
import "../styles/productModal.css";
import Swal from "sweetalert2";
import NewProductForm from "./newProductForm";
import withReactContent from "sweetalert2-react-content";
import {
  addNewProductAsync,
  toggleProductActivation,
  updateProductInformationAsync,
} from "../service/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const swalReact = withReactContent(Swal);

function VendorProductList({ productList }) {
  const [gifKey, setGifKey] = useState(0);
  useEffect(() => {
    // Cambiar la clave de la imagen cada vez que se monta el componente o cuando se necesita reiniciar el GIF
    const interval = setInterval(() => {
      setGifKey(prevKey => prevKey + 2);
    }, 10000); // Cambia la imagen cada 10 segundos (ajusta según sea necesario)

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.profile.id);
  const [productsEmpty, setProductsEmpty] = useState(
    !productList || productList.length === 0
  );

  useEffect(() => {
    setProductsEmpty(!productList || productList.length === 0);
  }, [productList]);

  const onProductCreation = (wasCreated) => {
    if (!wasCreated) {
      return;
    }
    swalReact.fire("Producto creado").then(() => {
      navigate(0);
    });
  };

  const onProductUpdate = (wasUpdated) => {
    if (!wasUpdated) {
      return;
    }
    swalReact.fire("Producto actualizado").then(() => navigate(0));
  };

  const createProductAsync = async ({ value }) => {
    if (!value) {
      return;
    }
    return await addNewProductAsync(value, vendorId);
  };

  const updateProductAsync = async (isConfirmed, productInformation) => {
    if (!isConfirmed) {
      return;
    }
    return await updateProductInformationAsync(productInformation, vendorId);
  };

  const openNewProductoModal = () => {
    swalReact
      .fire({
        title: "Nuevo producto",
        html: <NewProductForm />,
        confirmButtonText: "Crear",
        focusConfirm: false,
        customClass: {
          popup: 'custom-modal-style' // Aplicar la clase de estilo personalizado al contenedor del modal
        },
        preConfirm: () => {
          const popup = swalReact.getPopup();
          const inputElementList = Array.from(
            popup.querySelectorAll("input[name]")
          );
          const productInformation = inputElementList.reduce(
            (accumulator, inputElement) => ({
              ...accumulator,
              [inputElement.name]:
                inputElement.files?.[0] || inputElement.value,
            }),
            {}
          );
          return productInformation;
        },
      })
      .then(createProductAsync)
      .then(onProductCreation);
  };

  return (
    <div className="vendor-product-container">
      {productsEmpty ? (
        <div className="empty-product-list" style={{ textAlign: 'center' }}>
          <div class="gif-container">
          <p className="add-text">¡Empieza a crear productos!</p>
          <img
        key={gifKey}
        src={`https://images-platform.99static.com//GS_qMUF3F0wY0d7kWmqaP274psw=/fit-in/500x500/projects-files/37/3762/376299/68e5140f-1b9a-413c-85eb-f8e1564782fe.gif?${gifKey}`}
        alt="No hay productos disponibles"
      />          
      </div>
     </div>
      ) : (
        productList.map((product, index) => {
          const toggleActivation = () => {
            toggleProductActivation(product).then(onProductUpdate);
          };
          const updateProductButtonClickHandler = () => {
            swalReact
              .fire({
                title: "Actualizar producto",
                html: <NewProductForm baseProductInformation={product} />,
                confirmButtonText: "Actualizar",
                focusConfirm: false,
                preConfirm: () => {
                  const popup = swalReact.getPopup();
                  const inputElementList = Array.from(
                    popup.querySelectorAll("input[name]")
                  );
                  const productInformation = inputElementList.reduce(
                    (accumulator, inputElement) => ({
                      ...accumulator,
                      [inputElement.name]:
                        inputElement.files?.[0] || inputElement.value,
                    }),
                    {}
                  );
                  return productInformation;
                },
              })
              .then(
                async ({ isConfirmed, value }) =>
                  await updateProductAsync(isConfirmed, {
                    ...value,
                    id: product.id,
                    isActivated: product.isActivated,
                  })
              )
              .then(onProductUpdate);
          };
          return (
            <div key={index} className="vendor-product-details">
              <div className="vendor-product-header">
                <table>
                  <thead>
                    <tr className="vendor-product-tr">
                      <td className="vendor-product-title"></td>
                      <td className="vendor-product-title">Producto</td>
                      <td className="vendor-product-title">Precio</td>
                      <td className="vendor-product-title">Color</td>
                      <td className="vendor-product-title">Tamaño</td>
                      <td className="vendor-product-title">Vendedor</td>
                      <td className="vendor-product-title">Etiquetas</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <VendorProduct productInformation={product} />
                    </tr>
                  </tbody>
                </table>
                <div className="button-container">
                  <button
                    className="vendor-product-button-update"
                    onClick={updateProductButtonClickHandler}
                  >
                    Actualizar
                  </button>
                  <button
                    className="vendor-product-button-deactivate"
                    onClick={toggleActivation}
                  >
                    {product.isActivated ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
      <button onClick={openNewProductoModal} className="btn-add-product">
        Agregar nuevo producto
      </button>
    </div>
  );
}

export default VendorProductList;
