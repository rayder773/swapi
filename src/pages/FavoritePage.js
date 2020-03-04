import React from "react";
import PropTypes from 'prop-types';
import FavoriteList from "../components/FavoriteList";

import './style.scss';

const FavoritePage = ({history}) => {

  return (
    <div className="favorite-page">
      <FavoriteList onItemSelected={(id) => history.push(`people/${id}`)}/>
    </div>
  );
};

FavoritePage.propTypes = {
  history: PropTypes.func,
};

export default FavoritePage;