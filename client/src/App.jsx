import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Parent from './components/parent';
import UpdateProfile from './components/UpdateProfile';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login", "/signup"]} component={HomePage} />

        <Route exact path={["/dashboard"]} component={Dashboard} />
        <Route exact path={["/tables"]} component={Parent} />

        <Route exact path={["/update"]} component={UpdateProfile} />
      </Switch>
    </Router>
  );
}

export default App;
