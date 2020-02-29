import React from "react";
import PropTypes from 'prop-types';
import {Row, Col} from "antd";
import PeopleList from "../components/peopleList";
import PersonDetails from "../components/personDetails";

import './style.scss';

const PeoplePage = ({ history, match }) => {
  const {id} = match.params;

  return (
    <div className="people-page">
      <Row justify="center">
        <Col>
          <PeopleList onItemSelected={(id) => history.push(id)} />
        </Col>
        <Col>
          <PersonDetails id={id} />
        </Col>
      </Row>


    </div>
  );
};

PeopleList.propTypes = {
  history: PropTypes.func,
};

export default PeoplePage;