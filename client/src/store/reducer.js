import { combineReducers } from "redux";
import productReducer from "./entities/product"
export default combineReducers({
    products: productReducer
})