import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyDoka2s__sCvI1zelvnmg3odARayIK6SGk",
  authDomain: "airi-note.firebaseapp.com",
  databaseURL: "https://airi-note.firebaseio.com",
  projectId: "airi-note",
  storageBucket: "airi-note.appspot.com",
  messagingSenderId: "225581606400",
  appId: "1:225581606400:web:7000d6e317bf7b2b235ae5",
  measurementId: "G-YZRKNPV349"
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
