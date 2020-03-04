import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getPerson} from "../../store/actions/character";
import {getFilms} from "../../store/actions/films";
import {getStarships} from "../../store/actions/starships";
import {FILMS, IMAGE_BASE, SPECIES, STARSHIPS} from "../../constants";
import {Spin, Tabs} from 'antd';

import './style.scss';

const {TabPane} = Tabs;

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
    getFilms,
    isFilmFetching,
    films,
    getStarships,
    isStarshipsFetching,
    starships,
  } = props;

  useEffect(() => {
    getPerson(id)
  }, [id]);

  const onHandleTabClick = (type) => {
    switch (type) {
      case FILMS:
        return getFilms(person.films);
      case STARSHIPS:
        return getStarships(person.starships);
    }
  }

  return (
    <div className="person-details">
      <img src={`${IMAGE_BASE}${id}.jpg`} alt=""/>
      <div className="person-details-description">
        {Object.entries(details).map((item) => {
          return (
            <div>
              {item[0] === "name" ? (
                <div className="person-details-name">{person[item[0]]}</div>
              ) : (
                <div className="person-details-block">
                  <div className="person-details-block-first">
                    {item[1]}:
                  </div>
                  <div className="person-details-block-second">{person[item[0]]}</div>
                </div>
              )}
            </div>
          )
        })}
        <Tabs type="card" onTabClick={onHandleTabClick}>
          <TabPane tab="Films" key={FILMS}>
            {isFilmFetching ? <Spin/> : Object.values(films).map((item) => {
              return (
                <div className="film-name">{item}</div>
              );
            })}
          </TabPane>
          <TabPane tab="Starships" key={STARSHIPS}>
            {isStarshipsFetching ? <Spin/> : Object.keys(starships).length === 0 ? (
                <div className="film-name">None</div>
              ) :
              Object.values(starships).map((item) => {
                return (
                  <div className="film-name">{item}</div>
                );
              })}
          </TabPane>
          <TabPane tab="Species" key={SPECIES}>

          </TabPane>
        </Tabs>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  getPerson,
  getFilms,
  getStarships,
};

const mapStateToProps = (state) => ({
  person: state.character.character,
  isFilmFetching: state.films.isFetching,
  films: state.films.films,
  isStarshipsFetching: state.starships.isFetching,
  starships: state.starships.starships,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);