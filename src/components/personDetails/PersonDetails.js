import PropTypes from 'prop-types'
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
import db from '../../helpers/db';
import { YELLOW } from '../../constants/colors';
import { setFavoriteList } from '../../store/actions/favoriteList';
import { LikeIcon } from '../../assets/images';

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
    favoriteList,
    setFavoriteList,
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

  // eslint-disable-next-line react/prop-types
  const SetTabPane = ({ data, fetchType }) => (
    <>
      {fetchType ? <Preloader /> : Object.keys(data).length === 0 ? (
        <div className="tab-item" />
      )
        : Object.values(data).map((item) => (
          <div key={item} className="tab-item">{item}</div>
        ))}
    </>
  );

  const onLike = (item) => {
    if (
      favoriteList
      && Object.keys(favoriteList).length !== 0
      && favoriteList[item.name]
    ) {
      // here we can add or remove from/to favorite list
      db.child(item.name).update({
        favorite: !favoriteList[item.name].favorite,
      });
    } else {
      db.child(item.name).set({
        favorite: true,
        id: item.url.match(/\d+/)[0],
      });
    }

    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  };

  const setColor = (name) => {
    if (
      favoriteList
      && Object.keys(favoriteList).length !== 0
      && favoriteList[name]
      && favoriteList[name].favorite === true
    ) {
      return YELLOW;
    }

    return 'none';
  };


  return (
    <div className="person-details">
      {isFetching ? <Preloader /> : (
        <>
          <img src={`${IMAGE_BASE}${id}.jpg`} alt="" />
          <div className="person-details-description">
            {Object.entries(details).map((item) => (
              <div>
                {item[0] === 'name' ? (
                  <div>
                    <span
                      className="person-details-name"
                      style={{marginRight: '10px'}}
                    >
                      {person[item[0]]}
                    </span>
                    <LikeIcon
                      fill={setColor(person[item[0]])}
                      onClick={() => onLike(person)}
                      size={36}
                    />
                  </div>
                ) : (
                  <div className="person-details-block" key={item[0]}>
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

PersonDetails.propTypes = {
  favoriteList: PropTypes.object,
  films: PropTypes.array,
  getFilms: PropTypes.func.isRequired,
  getPerson: PropTypes.func.isRequired,
  getSpecies: PropTypes.func.isRequired,
  getStarships: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFilmFetching: PropTypes.bool.isRequired,
  isSpeciesFetching: PropTypes.bool.isRequired,
  isStarshipsFetching: PropTypes.bool.isRequired,
  person: PropTypes.object,
  setFavoriteList: PropTypes.func,
  species: PropTypes.object,
  starships: PropTypes.object
}

const mapDispatchToProps = {
  getPerson,
  getFilms,
  getStarships,
  getSpecies,
  setFavoriteList,
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
  favoriteList: state.favorite.favoriteList,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);

