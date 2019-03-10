import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard  from './View/Dashboard/container'
import AddUserForm  from './View/AddUserForm/container'
import EditUserForm  from './View/EditUserForm/container'
import firebase from 'firebase'

class App extends Component {
  
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCBxWp40pZI8S_l6laVjINbWKD5FjMa4rk",
      authDomain: "test-fa12c.firebaseapp.com",
      databaseURL: "https://test-fa12c.firebaseio.com",
      projectId: "test-fa12c",
      storageBucket: "test-fa12c.appspot.com",
      messagingSenderId: "348167597596"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
    <Router>
      <Switch>
      <Route exact  path="/" component={Dashboard} />
      <Route exact  path="/add" component={AddUserForm} />
      <Route exact  path="/edit/:id" component={EditUserForm} />
      </Switch>
    </Router>
    );
  }
}

export default App;
