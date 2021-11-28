import { CartItemType, shoppingCartType, UserType } from "Helper/Types";
import { createContext, Dispatch, ReactChild, useReducer } from "react";
import Cookies from "js-cookie";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_TO_CART";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

interface StateType {
    shoppingCart: shoppingCartType;
    userInfo: UserType | null;
}

interface ActionType {
    type: typeof ADD_TO_CART | typeof REMOVE_FROM_CART | typeof LOGIN_USER | typeof LOGOUT_USER;
    payload?: CartItemType;
    userInfo?: UserType;
}

interface ContextType {
    state: StateType;
    dispatch: Dispatch<ActionType>;
}

const initialState: StateType = {
    shoppingCart: {
        cart: [],
        countItem: 0,
        totalPrice: 0,
        shippingFee: 15000,
    },
    userInfo: typeof Cookies.get("userInfo") !== "undefined" ? JSON.parse(Cookies.get("userInfo")!) : null,
};
export const Store = createContext<ContextType>({
    state: initialState,
    dispatch: () => {},
});

function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            var ItemInCart = state.shoppingCart.cart.find((item) => item.id == newItem!.id);
            // Update if item exist
            if (ItemInCart) {
                ItemInCart.amount += newItem!.amount;
                return { ...state };
            }
            return {
                ...state,
                shoppingCart: {
                    ...state.shoppingCart,
                    cart: state.shoppingCart.cart.concat(newItem!),
                    countItem: state.shoppingCart.countItem + newItem!.amount,
                },
            };
        case REMOVE_FROM_CART:
            const currentItem = action.payload;
            var ItemInCart = state.shoppingCart.cart.find((item) => item.id == currentItem?.id);
            ItemInCart!.amount -= currentItem!.amount;
            if (ItemInCart?.amount === 0) {
                let currentItemIndex = state.shoppingCart.cart.findIndex((item) => item.id === currentItem?.id);
                state.shoppingCart.cart.splice(currentItemIndex, 1);
            }
            return { ...state };
       
        default:
            return state;
    }
}

export default function StoreProvider({ children }: { children: ReactChild }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { shoppingCart, userInfo } = state;
    if (typeof window !== "undefined") {
        Cookies.set("shoppingCart", JSON.stringify(shoppingCart));
    }
    shoppingCart.totalPrice = +shoppingCart.cart
        .reduce((total, item) => total + item.amount * item.price, 0)
        .toFixed(2);
    shoppingCart.countItem = shoppingCart.cart.reduce((count: number, item: CartItemType) => count + item.amount, 0);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
