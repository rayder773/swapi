import React from "react";

const PeoplePage = ({ history, match }) => {
  const {id} = match;
  return (
    <div className="people-page">
      {/*<PeopleList onItemSelected={(id) => history.push(id)} />*/}
      {/*<PersonDetails itemId={id} />*/}
    </div>
  )
};

export default PeoplePage;