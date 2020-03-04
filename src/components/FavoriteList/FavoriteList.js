import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeFromFavorite} from "../../store/actions/people";

import './style.scss';
import {DeleteIcon} from "../../assets/images";
import db from "../../helpers/db";
import {setFavoriteList} from "../../store/actions/favoriteList";

const FavotiteList = (props) => {

  const {
    pages,
    results,
    removeFromFavorite,
    setFavoriteList,
    favoriteList,
    onItemSelected
  } = props;

  useEffect(() => {
    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  }, [])

  const onDelete = (name) => {
    db.child(name).set({
      favorite: false,
    });

    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  };

  return (
    <div className="favorite-list">
      <div className="favorite-list-container">
        <ul>
          {Object.entries(favoriteList).map(item => {
          // {arr.map(item => {
            if (item[1].favorite) {
              return (
                <li
                  key={item[0]}
                >
                  <div onClick={() => onItemSelected(item[1].id)}>
                    {item[0]}
                  </div>
                  <DeleteIcon onClick={() => onDelete(item[0])} />
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  );
};

FavotiteList.propTypes = {
  pages: PropTypes.object,
};

FavotiteList.defaultProps = {
  pages: {},
};


const mapStateToProps = (state) => ({
  pages: state.people.pages,
  results: state.people.results,
  favoriteList: state.favorite.favoriteList,
});

const mapDispatchToProps = {
  removeFromFavorite,
  setFavoriteList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavotiteList);