import { createContext, useContext, useReducer } from "react";
//import uuid from "react-uuid";
import {Cart} from "../Components/Cart/Cart"

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { itemsInCart });

  return (
    <CartContext.Provider
      value={{ itemsInCart: state.itemsInCart, dispatch, Cart }}
    >
      {children}
    </CartContext.Provider>
  );
}

const itemsInCart = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (
        state.itemsInCart.filter((item) => item._id === action.payload._id)
          .length > 0
      ) {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        itemsInCart: state.itemsInCart.concat(action.payload),
      };
    case "INCREMENT":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (prevItem) => prevItem._id !== action.payload._id
        ),
      };

    default:
      return { state };
  }
};
