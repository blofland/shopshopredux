import {createSlice} from "@reduxjs/toolkit"
const slice = createSlice({
    initialState: [],
    name: "products",
    reducers: {
        UPDATE_PRODUCTS: (state, action) => {
            return action.payload
        }
    }
})
export const {UPDATE_PRODUCTS} = slice.actions
export default slice.reducer