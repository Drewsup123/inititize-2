import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
// Redux Imports
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './redux/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
require('dotenv').config();

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)

ReactDOM.render(
    <Router>
        <Provider store={store} >
            <App />
        </Provider>
    </Router>, 
document.getElementById('root')
);
