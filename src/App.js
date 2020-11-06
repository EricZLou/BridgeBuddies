import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import GameScreen from "./screens/GameScreen"
import HomeScreen from "./screens/HomeScreen"
import InvalidScreen from "./screens/InvalidScreen"
import StoreScreen from "./screens/StoreScreen"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> <HomeScreen/> </Route>
        <Route exact path="/404"> <InvalidScreen/> </Route>
        <Route path="/store"> <StoreScreen/> </Route>
        <Route path="/game"> <GameScreen/> </Route>
        <Redirect to="/404"/>
      </Switch>
    </Router>
  );
}

export default App;
