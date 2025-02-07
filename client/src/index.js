import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './reducers';
// import * as serviceWorker from "./serviceWorker" 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.min.css";
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

const middleware = [thunk];
// import Reducer from "./reducers";


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
