import "../styles/header.css";
import Search from "../images/search.png";
import Profile from "../images/profile.png";
import Cart from "../images/cart.png";
import Typo from "../images/typo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartModalWrapper from "./cartModalWrapper";

function Header() {
  const cartElementList = useSelector((state) => state.cart.list);
  const isUserLoggedIn = useSelector((state) => state.profile.isLoggedIn);
  const numberOfItems = cartElementList.length;
  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
      <ul className="logo" style={{ marginRight: 'auto' }}>
      <li>
        <Link to="/">
        <img src={Typo} className="logo-header" alt="Search" />
        </Link>
      </li>
      </ul>
        <ul className="nav mb-2 justify-content-center mb-md-0" style={{ marginLeft: 'auto' }}>
          <li>
            <Link to="/search" className="nav-link px-2">
              <img src={Search} className="icon" alt="Search" />
            </Link>
          </li>
          <li>
            <Link to={isUserLoggedIn ? "/profile" : "/sign"} className="nav-link px-2">
              <img src={Profile} className="icon" alt="Search" />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link px-2">
            <CartModalWrapper className="nav-link px-2" cartElementList={cartElementList} >
              <img src={Cart} className="icon" alt="Cart" />
            </CartModalWrapper>
              <span
                className={`badge lblCartCount ${
                  numberOfItems > 0 ? "" : "hidden"
                }`}
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

export default Header;
