import { combineReducers } from "redux";
import  entities   from "./entities/entities"
import ui from "./ui/ui"
export default combineReducers({
    entities,
    ui
})