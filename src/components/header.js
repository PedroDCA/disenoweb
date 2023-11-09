import "../styles/header.css";
import Search from "../images/search.png";
import Profile from "../images/profile.png";
import Cart from "../images/cart.png";
import { Link } from "react-router-dom";

function Header({ numberOfItems }) {
  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <ul className="nav mb-2 justify-content-center mb-md-0" style={{ marginLeft: 'auto' }}>
          <li>
            <Link to="/search" className="nav-link px-2">
              <img src={Search} className="icon" alt="Search" />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link px-2">
              <img src={Profile} className="icon" alt="Search" />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link px-2">
              <img src={Cart} className="icon" alt="Search" />
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
