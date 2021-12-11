import {createSlice} from "@reduxjs/toolkit"
const slice = createSlice({
    initialState: {
        current: null,
        data: []
    },
    name: "categories",
    reducers: {
        UPDATE_CATEGORIES: (state, action) => {
            state.data = [...state.data, ...action.payload]
        },
        UPDATE_CURRENT_CATEGORY: (state, action) => {
            state.current= action.payload
        }
    }
})
export const {UPDATE_PRODUCTS} = slice.actions
export default slice.reducer