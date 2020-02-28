import React from "react";
import PeopleList from "../components/peopleList";

const PeoplePage = ({ history, match }) => {
  const {id} = match;
  return (
    <div className="people-page">
      <PeopleList onItemSelected={(id) => history.push(id)} />
      {/*<PeopleList onItemSelected={(id) => history.push(id)} />*/}
      {/*<PersonDetails itemId={id} />*/}
    </div>
  )
};

export default PeoplePage;