import "../styles/header.css";
import Search from "../images/search.png";
import Profile from "../images/profile.png";
import Cart from "../images/cart.png";

function Header() {
  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <ul className="nav mb-2 justify-content-center mb-md-0" style={{ marginLeft: 'auto' }}>
          <li>
            <a href="#" className="nav-link px-1">
              <img src={Search} className="icon" alt='Search'/>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-1">
              <img src={Profile} className="icon" alt='Search'/>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-1">
              <img src={Cart} className="icon" alt='Search'/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
