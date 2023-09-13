import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import { Action } from '@remix-run/router';

let initialState = {
  signUpControl: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SIGN_UP':
      return {
        ...state,
        signUpControl: action.payload
      };
    default:
      return state
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);