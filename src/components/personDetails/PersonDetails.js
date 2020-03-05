import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { getPerson } from '../../store/actions/character';
import { getFilms } from '../../store/actions/films';
import { getStarships } from '../../store/actions/starships';
import {
  FILMS, IMAGE_BASE, SPECIES, STARSHIPS,
} from '../../constants';

import './style.scss';
import { getSpecies } from '../../store/actions/species';
import Preloader from '../Preloader';

const { TabPane } = Tabs;

const details = {
  name: 'name',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair color',
  skin_color: 'Skin color',
  eye_color: 'Eye color',
  birth_year: 'Birth year',
  gender: 'Gender',
};

const PersonDetails = (props) => {
  const {
    id,
    getPerson,
    person,
    isFetching,
    getFilms,
    isFilmFetching,
    films,
    getStarships,
    isStarshipsFetching,
    starships,
    getSpecies,
    species,
    isSpeciesFetching,
  } = props;

  useEffect(() => {
    getPerson(id);
  }, [id]);

  const onHandleTabClick = (type) => {
    switch (type) {
      case FILMS:
        return getFilms(person.films);
        break;
      case STARSHIPS:
        return getStarships(person.starships);
      case SPECIES:
        return getSpecies(person.species);
    }
  };

  const SetTabPane = ({ data, fetchType }) => (
    <>
      {fetchType ? <Preloader /> : Object.keys(data).length === 0 ? (
        <div className="tab-item" />
      )
        : Object.values(data).map((item) => (
          <div className="tab-item">{item}</div>
        ))}
    </>
  );

  return (
    // {isFe}
    <div className="person-details">
      {isFetching ? <Preloader /> : (
        <>
          <img src={`${IMAGE_BASE}${id}.jpg`} alt="" />
          <div className="person-details-description">
            {Object.entries(details).map((item) => (
              <div>
                {item[0] === 'name' ? (
                  <div className="person-details-name">{person[item[0]]}</div>
                ) : (
                  <div className="person-details-block">
                    <div className="person-details-block-first">
                      {item[1]}
                      :
                    </div>
                    <div className="person-details-block-second">{person[item[0]]}</div>
                  </div>
                )}
              </div>
            ))}
            <Tabs type="card" onTabClick={onHandleTabClick}>
              <TabPane tab="Films" key={FILMS}>
                <SetTabPane data={films} fetchType={isFilmFetching} />
              </TabPane>
              <TabPane tab="Starships" key={STARSHIPS}>
                <SetTabPane data={starships} fetchType={isStarshipsFetching} />
              </TabPane>
              <TabPane tab="Species" key={SPECIES}>
                <SetTabPane data={species} fetchType={isSpeciesFetching} />
              </TabPane>
            </Tabs>
          </div>
        </>
      )}

    </div>
  );
};

const mapDispatchToProps = {
  getPerson,
  getFilms,
  getStarships,
  getSpecies,
};

const mapStateToProps = (state) => ({
  person: state.character.character,
  isFetching: state.character.isFetching,
  isFilmFetching: state.films.isFetching,
  films: state.films.films,
  isStarshipsFetching: state.starships.isFetching,
  starships: state.starships.starships,
  isSpeciesFetching: state.species.isFetching,
  species: state.species.species,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
