/*import 'bootstrap/dist/css/bootstrap.css'*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'awesome-react-app:*');
}


ReactDOM.render(<App/>, document.getElementById('root'));
