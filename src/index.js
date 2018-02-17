import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';


// var config = {
//   apiKey: "AIzaSyAF3K2AWVKN6mPgScQe2IoJD8unGrKBh1s",
//   authDomain: "chat-43e59.firebaseapp.com",
//   databaseURL: "https://chat-43e59.firebaseio.com",
//   projectId: "chat-43e59",
//   storageBucket: "chat-43e59.appspot.com",
//   messagingSenderId: "272351661693"
// };

var config = {
  apiKey: "AIzaSyBBYe75LEtklWsbLDY9bPP63t6xmOToEnI",
  authDomain: "chatapp-66342.firebaseapp.com",
  databaseURL: "https://chatapp-66342.firebaseio.com",
  projectId: "chatapp-66342",
  storageBucket: "chatapp-66342.appspot.com",
  messagingSenderId: "946810887778"
};

firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
