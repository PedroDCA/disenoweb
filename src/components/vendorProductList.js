import VendorProduct from "./vendorProduct";
import "../styles/vendorProductList.css";
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
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.profile.id);

  const onProductCreation = (wasCreated) => {
    if (!wasCreated) {
      return;
    }
    swalReact.fire("Producto creado").then(() => navigate(0));
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
      <button onClick={openNewProductoModal}>Agregar nuevo producto</button>
      {productList?.map?.((product, index) => {
        const toggleActivation = () => {
          toggleProductActivation(product).then(onProductUpdate)
        }
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
                  isActivated: product.isActivated
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
                    <td className="vendor-product-title">Tamano</td>
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
                <button className="vendor-product-button-deactivate" onClick={toggleActivation}>
                  {product.isActivated ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VendorProductList;
