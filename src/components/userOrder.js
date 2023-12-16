import withReactContent from "sweetalert2-react-content";
import { formatToSpanishFullDate } from "../service/dateService";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/userOrder.css";
import Swal from "sweetalert2";
import { addNewProductRatingAsync, addNewVendorRatingAsync } from "../service/ratingService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const swalReact = withReactContent(Swal);

function UserOrder({ orderInformation }) {
  const navigate = useNavigate();
  const userId = useSelector((store) => store.profile.id);

  const onRatingCreation = (wasCreated) => {
    if (!wasCreated) {
      return;
    }
    swalReact.fire("Calificacion creada").then(() => {
      navigate(0);
    });
  };

  const createProductRatingAsync = async ({ value }) => {
    if (!value) {
      return;
    }
    return await addNewProductRatingAsync(orderInformation.id, userId, value);
  };

  const createVendorRatingAsync = async ({ value }) => {
    if (!value) {
      return;
    }
    return await addNewVendorRatingAsync(orderInformation.id, userId, value);
  };

  const openNewProductRatingModal = () => {
    swalReact
      .fire({
        title: "Calificar Producto",
        html: <input name="rating" type="number" min={1} max={5} />,
        confirmButtonText: "Confirmar",
        focusConfirm: false,
        customClass: {
          popup: "custom-modal-style", // Aplicar la clase de estilo personalizado al contenedor del modal
        },
        preConfirm: () => {
          const popup = swalReact.getPopup();
          const ratingElement = popup.querySelector("input[name='rating']");

          return Number(ratingElement.value) || 1;
        },
      })
      .then(createProductRatingAsync)
      .then(onRatingCreation);
  };

  const openNewVendirRatingModal = () => {
    swalReact
      .fire({
        title: "Calificar Vendedor",
        html: <input name="rating" type="number" min={1} max={5} />,
        confirmButtonText: "Confirmar",
        focusConfirm: false,
        customClass: {
          popup: "custom-modal-style", // Aplicar la clase de estilo personalizado al contenedor del modal
        },
        preConfirm: () => {
          const popup = swalReact.getPopup();
          const ratingElement = popup.querySelector("input[name='rating']");

          return Number(ratingElement.value) || 1;
        },
      })
      .then(createVendorRatingAsync)
      .then(onRatingCreation);
  };

  return (
    <div className="order-container">
      <div className="order-details">
        <div className="order-header">
          <div className="order-section">
            <p className="section-title">Fecha</p>
            <p>{formatToSpanishFullDate(orderInformation.date)}</p>
          </div>
          <div className="order-section">
            <p className="section-title">Total</p>
            <p>{formatPriceForColonCurrency(orderInformation.totalPrice)}</p>
          </div>
        </div>
        <div className="order-section">
          <p className="status">{orderInformation.status}</p>
          <div className="product-info">
            <img
              className="product-image"
              src={orderInformation.imageUrl}
              alt="Order information"
            />
            <p className="product-name">{orderInformation.name}</p>
            <p className="product-vendor">
              Vendido por {orderInformation.vendor}
            </p>
            <p className="product-quantity">
              Cantidad: {orderInformation.amount}
            </p>
            <p className="product-price">
              Precio Unitario:{" "}
              {formatPriceForColonCurrency(orderInformation.individualPrice)}
            </p>
          </div>
          <button
            className="order-button m-1"
            onClick={openNewProductRatingModal}
            disabled={orderInformation.isProductRated}
          >
            Calificar producto
          </button>
          <button
            className="order-button"
            onClick={openNewVendirRatingModal}
            disabled={orderInformation.isVendorRated}
          >
            Calificar vendedor
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
