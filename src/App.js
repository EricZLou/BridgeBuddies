import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ComingSoonScreen from "./screens/ComingSoonScreen"
import GameScreen from "./screens/GameScreen"
import HomeScreen from "./screens/HomeScreen"
import StoreScreen from "./screens/StoreScreen"


function App() {
  const COMING_SOON = false;
  return (
    COMING_SOON ? <ComingSoonScreen/> : (
    <Router>
      <Switch>
        <Route exact path="/"> <HomeScreen/> </Route>
        <Route path="/store"> <StoreScreen/> </Route>
        <Route path="/game"> <GameScreen/> </Route>
        <Redirect to="/"/>
      </Switch>
    </Router>)
  );
}

export default App;
