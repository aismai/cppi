import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/Common/PrivateRoute";
import AdminRoute from "./components/Common/AdminRoute";

import Landing from "./components/Layout/Landing";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Profiles from "./components/Profiles/Profiles";
import Questions from "./components/Questions/Questions";
import Question from "./components/Questions/Question/Question";
import PersonalData from "./components/PersonalData/PersonalData";
import PersonalDatum from "./components/PersonalData/PersonalDatum/PersonalDatum";
import Surveys from "./components/Surveys/Surveys";
import Survey from "./components/Surveys/Survey/Survey";

import "./App.css";
import "antd/dist/antd.css";

// Check for token
const token = localStorage.jwtToken;

if (token) {
  // Set auth token header
  setAuthToken(token);

  const decoded = jwt_decode(token);

  // Set isAuthenticated and current user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Landing>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/personal-data"
                  component={PersonalData}
                />
                <PrivateRoute
                  exact
                  path="/personal-data/:personalDatumId"
                  component={PersonalDatum}
                />
                <AdminRoute exact path="/users" component={Profiles} />
                <AdminRoute exact path="/questions" component={Questions} />
                <AdminRoute
                  exact
                  path="/questions/:questionId"
                  component={Question}
                />
                <AdminRoute exact path="/surveys" component={Surveys} />
                <AdminRoute
                  exact
                  path="/surveys/:surveyId"
                  component={Survey}
                />
              </Landing>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
