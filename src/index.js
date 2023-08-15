import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';


const store= createStore(reducer);

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

