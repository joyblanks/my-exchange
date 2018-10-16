import { createStore, applyMiddleware } from "redux";
import  reducers from "../reducers/index";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../epics";

//Create a middleware
const epicMiddleware = createEpicMiddleware();

//Create a store and apply the middleware
const store = createStore(reducers, applyMiddleware(epicMiddleware));

//Run Epic
epicMiddleware.run(rootEpic);

export default store;
