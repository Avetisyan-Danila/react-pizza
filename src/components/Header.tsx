import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/slices/cartSlice";
// TODO: Переделать везде картинки на импорты
import logoSvg from "../assets/pizza-logo.svg";
import React from "react";

const Header: React.FC = () => {
  const location = useLocation();
  const { totalPrice, totalCount } = useSelector(cartSelector);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>

        {location.pathname === "/cart" || <Search />}

        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img width="18" src="img/cart.svg" alt="Cart" />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
