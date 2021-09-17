import { combineReducers } from "redux";
import authReducer from "./authReducer";
import classReducer from "./classReducer";
import postReducer from "./postReducer";



const rootReducer = combineReducers({
    authReducer: authReducer,
    classReducer: classReducer,
    postReducer: postReducer
});
export default rootReducer;