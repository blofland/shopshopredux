import { combineReducers } from "redux";
import productReducer from "./product"
import categoryReducer from "./categories"
export default combineReducers({
    products: productReducer,
    categories: categoryReducer
})