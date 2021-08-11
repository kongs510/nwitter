import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./style.css";
import firebase from "./fbase";
console.log(firebase)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


