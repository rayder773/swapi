import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Input, Spin} from 'antd';
// import Button from "../Button/Button";
import {addToFavorite, getPeople, changeCurrentPage} from '../../store/actions/people';
import {DEFAULT_URL} from "../../constants";
// import firebase from "../../helpers/firebaseConfig";

import './style.scss';
import {LikeIcon} from "../../assets/images";
import character from "../../store/reducers/character";
import {YELLOW} from "../../constants/colors";

const {Search} = Input;

const PeopleList = (props) => {
  const {
    getPeople,
    results,
    next,
    prev,
    isFetching,
    onItemSelected,
    addToFavorite,
    currentPage,
    page,
    pages,
    lastDownloadedPage,
    changeCurrentPage,
  } = props;


  useEffect(() => {
    if (!currentPage) {
      return getPeople();
    }
  }, []);

  const onNextPage = () => {
    if (!next) {
      return false;
    }
    const newPage = currentPage + 1;
    if (pages[newPage]) {
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
      return changeCurrentPage(newPage);
    }

    return getPeople(prev);
  };

  const onLike = (name) => {
    const index = page.findIndex((item) => item.name === name);
    const character = page[index];
    character.isFavorite = !character.isFavorite;
    const newList = [
      ...page.slice(0, index),
      character,
      ...page.slice(index + 1),
    ];
    addToFavorite(newList);
  };

  return (
    <div className="people-list">
      <Search
        placeholder="input search text"
        onSearch={(value) => getPeople(`${DEFAULT_URL}/?search=${value}`, true)}
        enterButton
      />
      <div className="people-list-container">
        {isFetching ?
          <Spin size='large' className="people-list-spin" />
          : (
            <ul>
              {page.map((item) => {
                return (
                  <li
                    // onClick={() => onItemSelected(`${item.url.match(/\d+/)}`)}
                    key={item.name}
                  >
                    {item.name}
                    <LikeIcon
                      fill={item.isFavorite ? YELLOW : 'none'}
                      onClick={() => onLike(item.name)}
                    />
                  </li>
                );
              })}
            </ul>
          )
        }
      </div>

      <Button
        type='primary'
        size="large"
        shape="round"
        onClick={onPrevPage}
        disabled={!prev || currentPage < 2}
      >
        Prev
      </Button>
      <Button
        type='primary'
        size="large"
        shape="round"
        onClick={onNextPage}
        disabled={!next}
      >
        Next
      </Button>
    </div>
  )
};

PeopleList.defaultProps = {
  isFetching: false,
  page: [],
};

PeopleList.propTypes = {
  isFetching: PropTypes.bool,
  // results: Pe
};

const mapDispatchToProps = {
  getPeople,
  addToFavorite,
  changeCurrentPage,
};

const mapStateToProps = (state) => {
  // const { results } = state.people;
  // results.forEach((item) => {
  //   return item.isFavorite = false;
  // });
  const { pages, currentPage } = state.people;
  const lastDownloadedPage = Object.keys(pages).length;

  return {
    page: pages[currentPage],
    currentPage,
    lastDownloadedPage,
    pages,
    results: state.people.results,
    next: state.people.next,
    prev: state.people.previous,
    isFetching: state.people.isFetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
