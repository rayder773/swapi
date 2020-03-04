import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import PeoplePage from '../../pages/PeoplePage';
import PersonPage from '../../pages/PersonPage';
import Header from '../../components/Header';
import reducer from '../../store/reducers';
import './App.css';
import '../../assets/style/global.scss';
import 'antd/dist/antd.css';
import Background from "../../components/Background";
import firebase from "../../helpers/firebaseConfig";
import {FIREBASE_EMAIL, FIREBASE_PASSWORD} from "../../constants";
import FavoritePage from "../../pages/FavoritePage";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
        firebase.auth().signInWithEmailAndPassword(FIREBASE_EMAIL, FIREBASE_PASSWORD).catch((error) => {
          console.log(error);
        });
      }
    });

  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Background/>
        <Header/>
        <Switch>
          <Route path="/favorite/:id" component={PersonPage}/>
          <Route path="/favorite" component={FavoritePage}/>
          <Route path="/people/:id" component={PersonPage}/>
          <Route path="/people" component={PeoplePage}/>

          {/* <Route path="/login" component={LoginPage} /> */}
          {/* <Route path="/register" component={RegisterPage} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
