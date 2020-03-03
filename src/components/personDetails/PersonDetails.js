import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {getPerson} from "../../store/actions/character";
import {IMAGE_BASE} from "../../constants";

const details = {
  name: '',
  Height: '',
}

const PersonDetails = (props) => {
  const {
    id,
    getPerson,
    person,
  } = props;

  useEffect(() => {
    getPerson(id)
  }, [id])

  return (
    <div>
      peoson
      <img src={`${IMAGE_BASE}${id}.jpg`} alt="" />
      <div>
        {Object.entries(person).map(p => {
          return (
            <div key={p[1]} style={{color: 'white'}}>
              {p[0]}: {p[1]}
            </div>
          )
        })}
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  getPerson,
};

const mapStateToProps = (state) => ({
  person: state.character.character,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);