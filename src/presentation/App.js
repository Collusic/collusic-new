import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import RequestProjects from "./page/requestProject";
import Home from "./page/home";
import NavBar from "./page/nav_bar";
import DetailProject from "./page/detailProject";
import CreateContributeProject from "./page/createContributeProject";
import Create from "./page/create";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <NavBar></NavBar>
      </Switch>
      <Switch>
        <Route exact path="/requestProjects">
          <RequestProjects></RequestProjects>
        </Route>
        <Route exact path="/requestProjects/:id">
          <DetailProject></DetailProject>
        </Route>
        <Route exact path="/project/ContributeProject">
          <CreateContributeProject></CreateContributeProject>
        </Route>
        <Route exact path="/create">
          <Create></Create>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
