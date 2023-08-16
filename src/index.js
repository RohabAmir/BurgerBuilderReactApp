import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore (burgerBuilderReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app=(

  <Provider store={store}>   
    <BrowserRouter>
      <App/>
  </BrowserRouter>
  </Provider>
  
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( app
);


registerServiceWorker();

