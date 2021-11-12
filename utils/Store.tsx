import { CartItemType, shoppingCartType } from "Helper/Types";
import { createContext, Dispatch, ReactChild, useReducer } from "react";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_TO_CART";

interface StateType {
    shoppingCart: shoppingCartType;
}

interface ActionType {
    type: typeof ADD_TO_CART | typeof REMOVE_FROM_CART;
    payload: CartItemType;
}

interface ContextType {
    state: StateType;
    dispatch: Dispatch<ActionType>;
}

const initialState: StateType =
    typeof window != "undefined" && localStorage.state
        ? JSON.parse(localStorage.state)
        : {
              shoppingCart: {
                  cart: [],
                  countItem: 0,
                  totalPrice: 0,
                  shippingFee: 15
              },
          };

export const Store = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            var ItemInCart = state.shoppingCart.cart.find((item) => item.id == newItem.id);
            // Update if item exist
            if (ItemInCart) {
                ItemInCart.amount += newItem.amount;
                return { ...state };
            }
            return {
                ...state,
                shoppingCart: {
                    ...state.shoppingCart,
                    cart: state.shoppingCart.cart.concat(newItem),
                    countItem: state.shoppingCart.countItem + newItem.amount
                },
            };
        case REMOVE_FROM_CART:
            const currentItem = action.payload;
            var ItemInCart = state.shoppingCart.cart.find((item) => item.id == currentItem.id);
            ItemInCart!.amount -= currentItem.amount;
            if (ItemInCart?.amount === 0) {
                let currentItemIndex = state.shoppingCart.cart.findIndex((item) => item.id === currentItem.id);
                state.shoppingCart.cart.splice(currentItemIndex, 1);
            }
            return { ...state };
        default:
            return state;
    }
}

export default function StoreProvider({ children }: { children: ReactChild }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { shoppingCart } = state;
    if (typeof window !== "undefined") {
        localStorage.setItem("state", JSON.stringify(state));
    }
    shoppingCart.totalPrice = +shoppingCart.cart
        .reduce((total, item) => total + item.amount * item.price, 0)
        .toFixed(2);
    shoppingCart.countItem = shoppingCart.cart.reduce((count: number, item: CartItemType) => count + item.amount, 0);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
