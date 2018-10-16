import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/Common/PrivateRoute";

import Landing from "./components/Layout/Landing";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Profiles from "./components/Profiles/Profiles";

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
                {/* <Route exact path="/" component={Dashboard} /> */}
                <PrivateRoute exact path="/users" component={Profiles} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Landing>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
