import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import store from "./js/store/index";
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import ExchangeWindow from './js/containers/ExchangeWindow';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={ExchangeWindow}/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
