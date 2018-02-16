import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBBYe75LEtklWsbLDY9bPP63t6xmOToEnI",
  authDomain: "chatapp-66342.firebaseapp.com",
  databaseURL: "https://chatapp-66342.firebaseio.com",
  projectId: "chatapp-66342",
  storageBucket: "chatapp-66342.appspot.com",
  messagingSenderId: "946810887778"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
