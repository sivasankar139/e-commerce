import { combineReducers } from "redux";
import { cartReducer } from "./CartReducer";
const rootReducer = combineReducers({
    cartReducer:cartReducer
});
export default rootReducer;
