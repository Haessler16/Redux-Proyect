import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import reducers from "./reducers/index"

import reduxThunk from "redux-thunk"

const store = createStore(
        reducers,
        {},
        applyMiddleware(reduxThunk)
)

ReactDOM.render(
        <Provider store={store}>
                <App />
        </Provider>
        ,document.getElementById('root'));

serviceWorker.register();
