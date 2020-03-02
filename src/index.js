import React from 'react';
import ReactDOM from 'react-dom';
import './css/gologolo_style.css';
import App from './App';
import 'materialize-css/dist/css/materialize.min.css'

// START BY CHECKING TO SEE IF OUR LOGOS
// ARE IN LOCAL STORAGE. IF THEY ARE NOT,
// THEN LOAD THEM FROM THE JSON FILE AND
// PUT THEM THERE
ReactDOM.render(<App />, document.getElementById('root'));