import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {getPerson} from "../../store/actions/character";
import {IMAGE_BASE} from "../../constants";

const PersonDetails = (props) => {
  const {
    id,
    getPerson,
  } = props;

  useEffect(() => {
    getPerson(id)
  }, [id])

  return (
    <div>
      peopleDetails
      <img src={`${IMAGE_BASE}${id}.jpg`} alt="" />
    </div>
  )
};

const mapDispatchToProps = {
  getPerson,
};

const mapStateToProps = (state) => ({
  // results: state.people.results,
  // next: state.people.next,
  // prev: state.people.previous,
  // isFetching: state.people.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);