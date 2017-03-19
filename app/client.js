import React from 'react'
import ReactDOM from 'react-dom'
import createRoutes from './router'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { createHistory } from 'history'
import configureStore from './store/configureStore'
import rootSaga from './sagas';

const initialState = { cars: [ { name: 'First Car', type: 'Tesla', hp: 600 } ] };

const store = configureStore(initialState, createHistory);
store.runSaga(rootSaga);


let rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={ store }>
    { createRoutes(browserHistory) }
  </Provider>, rootElement
);
