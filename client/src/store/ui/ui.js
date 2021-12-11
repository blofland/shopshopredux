import {createSlice} from "@reduxjs/toolkit"
const slice = createSlice({
    initialState: {
        cartOpen: false,
        cart: []
    },
    name: "ui",
    reducers: {
        ADD_TO_CART: (state, action) => {
            state.cartOpen = true 
            state.cart.push(action.payload)
        },
        ADD_MULTIPLE_TO_CART: (state, action) => {
            state.cart = [...state.cart, ...action.payload]
        },
        UPDATE_CART_QUANTITY: (state, action) => {
            state.cartOpen = true 
            state.cart = state.cart.map(product => {
                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity
                }
                return product
                }
            )
        },
        REMOVE_FROM_CART: (state, action) => {
            state.cart = state.cart.filter(product => {
                return product._id !== action._id;
            });
            state.cartOpen = state.cart.length > 0 
        },
        CLEAR_CART: (state) => {
            state.cart = []
            state.cartOpen = false 
        },
        TOGGLE_CART: (store) => {
            store.cartOpen = !store.cartOpen
        }
    }
})
export const {UPDATE_PRODUCTS} = slice.actions
export default slice.reducer



// store => {
    // ui,
    // products, 
// }