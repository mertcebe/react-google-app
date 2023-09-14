import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux'
import { SearchReducer, store } from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchReducer>
      <AppRouter />
    </SearchReducer>
  </React.StrictMode>
);