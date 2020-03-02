import React from 'react';
import PropTypes from 'prop-types';
import PersonDetails from "../components/personDetails/PersonDetails";

const PersonPage = ({ match }) => {
  const {id} = match.params;

  return (
    <div className="person-page">
      <PersonDetails id={id} />
    </div>
  )
};

PersonPage.propTypes = {};

PersonPage.defaultProps = {};

export default PersonPage;