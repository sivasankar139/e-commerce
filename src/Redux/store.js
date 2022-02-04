import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./RootReducer";
const composeEnhancers = composeWithDevTools({});

const initialStore={
    cartReducer:{
        cartItems:JSON.parse(localStorage.getItem('cartItems')) ?? []
    }
}

export const store =createStore(rootReducer, initialStore, composeEnhancers())