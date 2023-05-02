import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import './index.css';
import registerServiceWorker from "./registerServiceWorker";
import reportWebVitals from './reportWebVitals';
import store from './store';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store} >
    <App />
   </Provider>
   </CookiesProvider>
 ,
  document.getElementById('root')
);
registerServiceWorker();
reportWebVitals();
