import { createContext, useContext, useReducer } from "react";
//import uuid from "react-uuid";

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

const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  return (
    <>
      <h1>Cart </h1>
      <div className="component-container card-div">
        {itemsInCart.map((item) => {
          return (
            <div
              key={item._id}
              style={{
                border: "1px ",
                margin: "1rem",
                padding: "1rem",
                boxShadow: "5px 10px 5px #F3F4F6"
              }}
            >
              {item.name}
              <p>{item.price}</p>
              <p>
                <img
                  src={item.image}
                  alt="product"
                  style={{ width: "100%", height: "auto" }}
                />
              </p>
              <button
                onClick={() =>
                  cartDispatch({ type: "INCREMENT", payload: item })
                }
              >
                +
              </button>
              {item.quantity}
              <button
                onClick={() =>
                  cartDispatch({ type: "DECREMENT", payload: item })
                }
              >
                -
              </button>
              <button
                className="button secondary-button"
                onClick={() => cartDispatch({ type: "REMOVE", payload: item })}
              >
                Remove From Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
