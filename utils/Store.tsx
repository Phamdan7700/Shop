import { CartItemType } from "Helper/Types";
import { createContext, Dispatch, ReactChild, useReducer } from "react";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_TO_CART";

interface StateType {
    cart: CartItemType[];
    countItem: number;
    totalPrice: number;
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
    typeof window != "undefined"
        ? JSON.parse(localStorage.state)
        : {
              cart: [],
              countItem: 0,
              totalPrice: 0,
          };

export const Store = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            var ItemInCart = state.cart.find((item) => item.id == newItem.id);
            // Update if item exist
            if (ItemInCart) {
                ItemInCart.amount += newItem.amount;
                return { ...state };
            }
            return {
                ...state,
                cart: state.cart.concat(newItem),
                countItem: state.countItem + newItem.amount,
            };
        case REMOVE_FROM_CART:
            const currentItem = action.payload;
            var ItemInCart = state.cart.find(
                (item) => item.id == currentItem.id
            );
            ItemInCart!.amount -= currentItem.amount;
            if (ItemInCart?.amount === 0) {
                let currentItemIndex = state.cart.findIndex(
                    (item) => (item.id = currentItem.id)
                );
                state.cart.splice(currentItemIndex, 1);
            }
            return { ...state };
        default:
            return state;
    }
}

export default function StoreProvider({ children }: { children: ReactChild }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    if (typeof window !== "undefined") {
        localStorage.setItem("state", JSON.stringify(state));
    }
    state.totalPrice = state.cart.reduce(
        (total, item) => total + item.amount * item.price,
        0
    );
    state.countItem = state.cart.reduce(
        (count: number, item: CartItemType) => count + item.amount,
        0
    );
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
