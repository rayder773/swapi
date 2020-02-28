import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Spin, Button} from 'antd';

// import Button from "../Button/Button";
import {getPeople} from '../../store/actions/people';

const PeopleList = (props) => {
  const {
    getPeople,
    results,
    next,
    prev,
    isFetching,
    onItemSelected,
  } = props;

  useEffect(() => {
    getPeople();
  }, []);

  const onNextPage = () => {
    if (!next) {
      return false;
    }
    return getPeople(next);
  };

  const onPrevPage = () => {
    if (!prev) {
      return false;
    }
    return getPeople(prev);
  };

  return (
    <div>
      {isFetching ?
        <Spin size='large'/>
        :
        <ul>
          {results.map((item) => <li onClick={() => onItemSelected(`${item.url.match(/\d+/)}`)} key={item.name}>{item.name}</li>)}
        </ul>
      }
      <Button type='primary' size="large" shape="round" onClick={onPrevPage}>Prev</Button>
      <Button type='primary' size="large" shape="round" onClick={onNextPage}>Next</Button>
    </div>
  )
};

PeopleList.propTypes = {
  isFetching: PropTypes.bool,
};

const mapDispatchToProps = {
  getPeople,
};

const mapStateToProps = (state) => ({
  results: state.people.results,
  next: state.people.next,
  prev: state.people.previous,
  isFetching: state.people.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
