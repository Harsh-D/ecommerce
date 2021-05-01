import { createContext, useContext, useReducer } from "react";
//import uuid from "react-uuid";
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

function Wishlist() {
  const { itemsInWishlist, dispatch: wishlistDispatch } = useWishlist();
  return (
    <>
      <h1>Wishlist </h1>
      <div className="component-container card-div">
        {itemsInWishlist.map((item) => {
          return (
            <div
              key={item._id}
              style={{
                border: "1px ",
                margin: "1rem",
                padding: "1rem",
                boxShadow: "5px 10px 5px #F3F4F6",
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
                  wishlistDispatch({ type: "INCREMENT", payload: item })
                }
              >
                +
              </button>
              {item.quantity}
              <button
                onClick={() =>
                  wishlistDispatch({ type: "DECREMENT", payload: item })
                }
              >
                -
              </button>
              <button
                className="button secondary-button"
                onClick={() =>
                  wishlistDispatch({ type: "REMOVE", payload: item })
                }
              >
                Remove From Wishlist
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
