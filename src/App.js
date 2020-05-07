import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import DoASurvey from "./components/DoASurvey";
import SurveysDone from "./components/SurveysDone";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/survey" component={DoASurvey} />
          <PrivateRoute  path="/profile" component={Profile} />
          <PrivateRoute  path="/surveysdone" component={SurveysDone} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
