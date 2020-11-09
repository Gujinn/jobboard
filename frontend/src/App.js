import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import AddJobs from './components/Job/AddJobs';
import JobList from './components/Job/JobList'; 

import Apply from './components/Apply/Apply'
import Register from './components/auth/Register';
import Login from "./components/auth/Login";

import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateAdmin from "./components/private-route/PrivateAdmin";
import Private from "./components/private-route/PrivateAdd";

import Dashboard from "./components/dashboard/Dashboard";
import Edit from "./components/dashboard/Edit";
import Admin from "./components/admin/Admin";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; 
  // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {

  return (
    <Provider store={store}>
    <Router>
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link to ="/" className="navbar-brand">Job board</Link>
              <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Jobs</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add" className="nav-link">Add Job</Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register/Edit</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link float-right">Login/Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
      <Route path="/" exact component={JobList} />
      <Route path="/addApply" exact component={Apply} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Switch>
        <PrivateRoute exact path="/edit" component={Edit} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateAdmin exact path="/admin" component={Admin} />
        <Private path="/add" exact component={AddJobs} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;