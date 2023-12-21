import "../styles/header.css";
import Search from "../images/search.png";
import Profile from "../images/profile.png";
import Cart from "../images/cart.png";
import Typo from "../images/typo.png";
import { Link } from "react-router-dom"; // Para gestionar enlaces en React
import { useSelector } from "react-redux"; // Para acceder al estado de Redux
import CartModalWrapper from "./cartModalWrapper"; // Componente para el carrito

// Definición del componente Header
function Header() {
  // Accede al estado de Redux para obtener la lista de elementos del carrito y la información del usuario
  const cartElementList = useSelector((state) => state.cart.list);
  const isUserLoggedIn = useSelector((state) => state.profile.isLoggedIn);
  const numberOfItems = cartElementList.length; // Cuenta el número de elementos en el carrito

  // Renderizado del componente Header
  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        {/* Lista para mostrar el logo */}
        <ul className="logo" style={{ marginRight: 'auto' }}>
          <li>
            <Link to="/">
              {/* Enlace al inicio con el logo */}
              <img src={Typo} className="logo-header" alt="Search" />
            </Link>
          </li>
        </ul>
        {/* Lista para mostrar elementos de navegación */}
        <ul className="nav mb-2 justify-content-center mb-md-0" style={{ marginLeft: 'auto' }}>
          {/* Elemento de navegación para la búsqueda */}
          <li>
            <Link to="/search" className="nav-link px-2">
              <img src={Search} className="icon" alt="Search" />
            </Link>
          </li>
          {/* Elemento de navegación para el perfil */}
          <li>
            <Link to={isUserLoggedIn ? "/profile" : "/sign"} className="nav-link px-2">
              <img src={Profile} className="icon" alt="Search" />
            </Link>
          </li>
          {/* Elemento de navegación para el carrito con el componente CartModalWrapper */}
          <li>
            <Link to="/cart" className="nav-link px-2">
              <CartModalWrapper className="nav-link px-2" cartElementList={cartElementList}>
                <img src={Cart} className="icon" alt="Cart" />
              </CartModalWrapper>
              {/* Contador de elementos en el carrito */}
              <span
                className={`badge lblCartCount ${numberOfItems > 0 ? "" : "hidden"}`}
              >
                {numberOfItems}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header; // Exporta el componente Header