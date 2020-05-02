import React from 'react';
import MainScreenContainer from './Containers/MainScreenContainer';
import GameScreenContainer from './Containers/GameScreenContainer';
import TimesUpScreenContainer from './Containers/TimesUpScreenContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainScreenContainer} exact/>
        <Route path="/game" component={GameScreenContainer}/>
        <Route path="/timesUp" component={TimesUpScreenContainer}/>
      </Switch>
    </Router>
  );
}

export default App;
