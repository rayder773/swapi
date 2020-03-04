import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getPerson} from "../../store/actions/character";
import {getFilms} from "../../store/actions/films";
import {getStarships} from "../../store/actions/starships";
import {setFavoriteList} from "../../store/actions/favoriteList";
import {FILMS, IMAGE_BASE, SPECIES, STARSHIPS} from "../../constants";
import {Tabs} from 'antd';

import './style.scss';
import {getSpecies} from "../../store/actions/species";
import Preloader from "../Preloader";
import db from "../../helpers/db";
import {LikeIcon} from "../../assets/images";
import {YELLOW} from "../../constants/colors";

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
    setFavoriteList,
    favoriteList,
  } = props;

  useEffect(() => {
    getPerson(id);
    db.once('value', (snapshot) => {
      console.log(snapshot.val())
      setFavoriteList(snapshot.val());
    });
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

  const SetTabPane = ({data, fetchType}) => {
    return (
      <>
        {fetchType ? <Preloader/> : Object.keys(data).length === 0 ? (
            <div className="tab-item"></div>
          ) :
          Object.values(data).map((item) => {
            return (
              <div className="tab-item">{item}</div>
            );
          })
        }
      </>
    );
  };

  const onDelete = () => {
    db.child(person.name).set({
      favorite: false,
    });

    db.once('value', (snapshot) => {
      setFavoriteList(snapshot.val());
    });
  };

  const SetLike = () => {
    let color = "";
    if (Object.keys(favoriteList).length !== 0 &&
          favoriteList[person.name] &&
          favoriteList[person.name].favorite === true) {
      color = YELLOW
    }
    return (
      <LikeIcon
        size={36}
        fill={color}
        onClick={onDelete}
      />
    )

  }


  return (
    <div className="person-details">
      {isFetching ? <Preloader/> : (
        <>
          <img src={`${IMAGE_BASE}${id}.jpg`} alt=""/>
          <div className="person-details-description">
            {Object.entries(details).map((item) => {
              return (
                <div>
                  {item[0] === "name" ? (
                    <div className="person-details-name">
                      {person[item[0]]}
                      <SetLike/>
                    </div>
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
                <SetTabPane data={films} fetchType={isFilmFetching}/>
              </TabPane>
              <TabPane tab="Starships" key={STARSHIPS}>
                <SetTabPane data={starships} fetchType={isStarshipsFetching}/>
              </TabPane>
              <TabPane tab="Species" key={SPECIES}>
                <SetTabPane data={species} fetchType={isSpeciesFetching}/>
              </TabPane>
            </Tabs>
          </div>
        </>
      )}

    </div>
  )
};

const mapDispatchToProps = {
  getPerson,
  getFilms,
  getStarships,
  getSpecies,
  setFavoriteList
};

const mapStateToProps = (state) => ({
  person: state.character.character,
  isFetching: state.character.isFetching,
  favoriteList: state.favorite.favoriteList,
  isFilmFetching: state.films.isFetching,
  films: state.films.films,
  isStarshipsFetching: state.starships.isFetching,
  starships: state.starships.starships,
  isSpeciesFetching: state.species.isFetching,
  species: state.species.species,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);