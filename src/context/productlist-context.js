import { createContext, useContext, useReducer } from "react";
import {Products} from "../Components/Products/Products"

const ProductlistContext = createContext();

export function useProductlist() {
  return useContext(ProductlistContext);
}

export function ProductlistProvider({ children }) {
  const [state, dispatch] = useReducer(productlistReducer, {
    itemsInProductlist,
  });

  return (
    <ProductlistContext.Provider
      value={{
        itemsInProductlist: state.itemsInProductlist,
        dispatch,
        Products,
      }}
    >
      {children}
    </ProductlistContext.Provider>
  );
}

const itemsInProductlist = [
  // {
  //   id: 1,
  //   name: "kala chasma",
  //   price: 1000,
  //   quantity: 1
  // },
  // {
  //   id: 2,
  //   name: "laal chhadi",
  //   price: 500,
  //   quantity: 1
  // },
  // {
  //   id: 3,
  //   name: "jalebi",
  //   price: 50,
  //   quantity: 1
  // },
  // {
  //   id: 4,
  //   name: "japani joota",
  //   price: 10000,
  //   quantity: 1
  // }
];

const productlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_PRODUCTLIST":
      return {
        ...state,
        itemsInProductlist: action.payload,
      };
    case "HIGH_TO_LOW":
      function compareHighToLow(a, b) {
        if (a.price <= b.price) return 1;
        if (b.price < a.price) return -1;
        return 0;
      }
      return {
        ...state,
        itemsInProductlist: [...state.itemsInProductlist].sort(
          compareHighToLow
        ),
      };

    case "LOW_TO_HIGH":
      function compareLowToHigh(a, b) {
        if (a.price >= b.price) return 1;
        if (b.price > a.price) return -1;
        return 0;
      }
      return {
        ...state,
        itemsInProductlist: [...state.itemsInProductlist].sort(
          compareLowToHigh
        ),
      };

    default:
      return { state };
  }
};