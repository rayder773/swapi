import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import {
  addToFavorite,
  getPeople,
  changeCurrentPage,
} from '../../store/actions/people';
import { setFavoriteList } from '../../store/actions/favoriteList';
import { DEFAULT_URL } from '../../constants';
import { YELLOW } from '../../constants/colors';
import { LikeIcon } from '../../assets/images';
import db from '../../helpers/db';
import Preloader from '../Preloader';

import './style.scss';

const { Search } = Input;

const PeopleList = (props) => {
  const {
    getPeople,
    next,
    prev,
    isFetching,
    onItemSelected,
    currentPage,
    page,
    pages,
    changeCurrentPage,
    setFavoriteList,
    favoriteList,
  } = props;

  useEffect(() => {
    if (!currentPage) {
      getPeople();
    }

    // get favorite list from firebase
    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  }, []);

  const onNextPage = () => {
    if (!next) {
      return false;
    }
    const newPage = currentPage + 1;
    if (pages[newPage]) {
      // change page
      return changeCurrentPage(newPage);
    }
    return getPeople(next);
  };

  const onPrevPage = () => {
    if (!prev) {
      return false;
    }

    const newPage = currentPage - 1;

    if (pages[newPage]) {
      // change page
      return changeCurrentPage(newPage);
    }

    return getPeople(prev);
  };

  const onLike = (item) => {
    console.log(item.url.match(/\d+/)[0])
    if (
      favoriteList
      && Object.keys(favoriteList).length !== 0
      && favoriteList[item.name]
    ) {
      // here we can add or remove from/to favorite list
      db.child(item.name).update({
        favorite: !favoriteList[item.name].favorite,
      });
    } else {
      db.child(item.name).set({
        favorite: true,
        id: item.url.match(/\d+/)[0],
      });
    }

    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  };

  const setColor = (name) => {
    if (
      favoriteList
      && Object.keys(favoriteList).length !== 0
      && favoriteList[name]
      && favoriteList[name].favorite === true
    ) {
      return YELLOW;
    }

    return 'none';
  };

  return (
    <div className="people-list">
      <Search
        placeholder="input search text"
        // second argument im method getPeople()
        // is defining update peopleList according to search result
        onSearch={(value) => getPeople(`${DEFAULT_URL}/?search=${value}`, true)}
        enterButton
      />
      <div className="people-list-container">
        {isFetching ? (
          <Preloader />
        ) : (
          <ul>
            {page.map((item) => (
              <li key={item.name}>
                {/* take id of character from url property which we got from .../people */}
                <div onClick={() => onItemSelected(`${item.url.match(/\d+/)}`)}>
                  {item.name}
                </div>
                <LikeIcon
                  fill={setColor(item.name)}
                  onClick={() => onLike(item)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="people-list-buttons-container">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={onPrevPage}
          disabled={!prev || currentPage < 2}
        >
          Prev
        </Button>
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={onNextPage}
          disabled={!next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

PeopleList.defaultProps = {
  favoriteList: {},
  isFetching: false,
  page: [],
  pages: {},
  next: null,
  prev: null,
};

PeopleList.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  favoriteList: PropTypes.object,
  getPeople: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  next: PropTypes.string,
  onItemSelected: PropTypes.func.isRequired,
  page: PropTypes.array,
  pages: PropTypes.object,
  prev: PropTypes.string,
  setFavoriteList: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getPeople,
  addToFavorite,
  changeCurrentPage,
  setFavoriteList,
};

const mapStateToProps = (state) => {
  const { pages, currentPage } = state.people;
  const lastDownloadedPage = Object.keys(pages).length;

  return {
    page: pages[currentPage],
    currentPage,
    lastDownloadedPage,
    pages,
    next: state.people.next,
    prev: state.people.previous,
    isFetching: state.people.isFetching,
    favoriteList: state.favorite.favoriteList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
