import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeFromFavorite} from "../../store/actions/people";

import './style.scss';
import {DeleteIcon} from "../../assets/images";

const FavotiteList = (props) => {
  const {pages, results, removeFromFavorite} = props;

  let arr = [];

  Object.values(pages).forEach(item => {
    return arr.push(...item);
  });

  const onDelete = (name) => {
    // console.log(name)
    const character = arr.find((item) => item.name === name);
    character.isFavorite = false;
    removeFromFavorite(character);
  };

  return (
    <div className="favorite-list">
      <div className="favorite-list-container">
        <ul>
          {arr.map(item => {
            if (item.isFavorite) {
              return (
                <li
                  key={item.name}
                >
                  {item.name}
                  <DeleteIcon onClick={() => onDelete(item.name)}/>
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
});

const mapDispatchToProps = {
  removeFromFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavotiteList);