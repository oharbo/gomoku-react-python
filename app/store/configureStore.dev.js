import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import createLogger from './logger';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';

export default function configureStore(initialState, helpersConfig) {
  const sagaMiddleware = createSagaMiddleware();
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(sagaMiddleware, ...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(sagaMiddleware, ...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
/*
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'



export default function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk.withExtraArgument(helpers)];

  // const enchancer = compose(
  //   // Save for redux middleware
  //   applyMiddleware(sagaMiddleware, ...thunkMiddleware),
  //   reduxReactRouter({
  //     createHistory
  //   }),
  //   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  // )(createStore);

  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(sagaMiddleware, ...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(sagaMiddleware, ...middleware);
  }
  /////////

  const store = createStore(rootReducer, initialState, enchancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    })
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store
}

*/
