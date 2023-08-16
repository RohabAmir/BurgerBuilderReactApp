import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';


const store= createStore (burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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

