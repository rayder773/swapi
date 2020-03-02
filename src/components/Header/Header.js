import React from "react";
import {NavLink} from "react-router-dom";
import './styles.scss';

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/people/" activeClassName='active'>
        People
      </NavLink>
      <NavLink to="/favorite">
        Favorite
      </NavLink>
    </div>
  )
}

export default Header;