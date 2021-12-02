import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDZrbbvL4SEFx6kYkv5fHe8Y8PXdp-g1lw",
    authDomain: "shopify-b5394.firebaseapp.com",
    projectId: "shopify-b5394",
    storageBucket: "shopify-b5394.appspot.com",
    messagingSenderId: "1070954135438",
    appId: "1:1070954135438:web:4399632dac63cce554aedf",
    measurementId: "G-ZL7C6GKFLN"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
