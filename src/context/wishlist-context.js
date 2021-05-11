import { createContext, useContext, useReducer } from "react";
import {Wishlist} from "../Components/Wishlist/Wishlist"

const WishContext = createContext();

export function useWishlist() {
  return useContext(WishContext);
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { itemsInWishlist });

  return (
    <WishContext.Provider
      value={{ itemsInWishlist: state.itemsInWishlist, dispatch, Wishlist }}
    >
      {children}
    </WishContext.Provider>
  );
}

const itemsInWishlist = [];

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (
        state.itemsInWishlist.filter((item) => item._id === action.payload._id)
          .length > 0
      ) {
        return {
          ...state,
          itemsInWishlist: state.itemsInWishlist.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        itemsInWishlist: state.itemsInWishlist.concat(action.payload),
      };
    case "INCREMENT":
      return {
        ...state,
        itemsInWishlist: state.itemsInWishlist.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        itemsInWishlist: state.itemsInWishlist.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE":
      return {
        ...state,
        itemsInWishlist: state.itemsInWishlist.filter(
          (prevItem) => prevItem._id !== action.payload._id
        ),
      };

    default:
      return { state };
  }
};