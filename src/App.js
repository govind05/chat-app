import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import * as firebase from 'firebase';

import FormikApp from './component/Form/Form';
import ChatPage from './container/Chat/Chat';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={FormikApp} />
          <Route path='/chat' component={ChatPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
