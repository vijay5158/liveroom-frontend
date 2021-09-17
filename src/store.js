import rootReducer from "./reducers/rootReducer";
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

export default store;
