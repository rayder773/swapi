import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import PeoplePage from "../../pages/PeoplePage";
import Header from "../../components/Header";
import reducer from '../../store/reducers';
import './App.css';
import 'antd/dist/antd.css';
import FavoriteList from "../../components/FavoriteList/FavoriteList";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/people/:id?" component={PeoplePage}/>
          <Route path="/favorite" component={FavoriteList}/>
          {/*<Route path="/login" component={LoginPage} />*/}
          {/*<Route path="/register" component={RegisterPage} />*/}
          app
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
