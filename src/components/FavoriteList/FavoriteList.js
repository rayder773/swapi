import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const FavotiteList = (props) => {
  return (
    <div>
      FavotiteList
    </div>
  )
};

FavotiteList.propTypes = {};

FavotiteList.defaultProps = {};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavotiteList);