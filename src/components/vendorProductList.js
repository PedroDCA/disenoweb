import VendorProduct from "./vendorProduct";
import "../styles/vendorProductList.css";
import Swal from "sweetalert2";
import NewProductForm from "./newProductForm";
import withReactContent from "sweetalert2-react-content";
import { addNewProductAsync } from "../service/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const swalReact = withReactContent(Swal);

function VendorProductList({ productList }) {
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.profile.id);

  const onCreateProductClickHandler = async ({value}) => {
    if (!value) {
      return;
    }
    await addNewProductAsync(value, vendorId);

  }

  const openNewProductoModal = () => {
    swalReact.fire({
      title: "Nuevo producto",
      html: <NewProductForm />,
      confirmButtonText: "Crear",
      focusConfirm: false,
      preConfirm: () => {
        const popup = swalReact.getPopup();
        const inputElementList = Array.from(popup.querySelectorAll("input[name]"));
        const productInformation = inputElementList.reduce(
          (accumulator, inputElement) => ({
            ...accumulator,
            [inputElement.name]: inputElement.files?.[0] || inputElement.value,
          }),
          {}
        );
        return productInformation;
      },
    }).then(onCreateProductClickHandler).then(() => swalReact.fire('Producto creado').then(() => navigate(0)));
  };
  return (
    <div className="vendor-product-container">
      <button onClick={openNewProductoModal}>Agregar nuevo producto</button>
      {productList?.map?.((product, index) => (
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
              <button className="vendor-product-button-update">
                Actualizar
              </button>
              <button className="vendor-product-button-deactivate">
                Desactivar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VendorProductList;
