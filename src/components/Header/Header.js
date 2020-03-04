import React from "react";
import {NavLink} from "react-router-dom";
import './styles.scss';
import {logo} from "../../assets/images";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div>
        <NavLink to="/people" activeClassName='active'>
          People
        </NavLink>
        <NavLink to="/favorite">
          Favorite
        </NavLink>
    </div>

    </div>
)
}

export default Header;