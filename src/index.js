import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const app=(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( app
);

registerServiceWorker();

