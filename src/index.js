import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';


var config = {
  apiKey: "AIzaSyAF3K2AWVKN6mPgScQe2IoJD8unGrKBh1s",
  authDomain: "chat-43e59.firebaseapp.com",
  databaseURL: "https://chat-43e59.firebaseio.com",
  projectId: "chat-43e59",
  storageBucket: "chat-43e59.appspot.com",
  messagingSenderId: "272351661693"
};
firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
