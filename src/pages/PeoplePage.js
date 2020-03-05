import React from 'react';
import PropTypes from 'prop-types';
import PeopleList from '../components/peopleList';

import './style.scss';

const PeoplePage = ({ history }) => (
  <div className="people-page">
    <PeopleList onItemSelected={(id) => history.push(`people/${id}`)} />
  </div>
);

PeopleList.propTypes = {
  history: PropTypes.func,
};

export default PeoplePage;
