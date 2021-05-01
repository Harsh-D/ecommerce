import { createContext, useContext, useReducer } from "react";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
//import uuid from "react-uuid";
//import axios from "axios";

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

function Products() {
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await axios.get("/api/products");
  //       productlistDispatch({
  //         type: "ADD_TO_PRODUCTLIST",
  //         payload: response.data.products
  //       });
  //     } catch (error) {
  //       console.error("error", error);
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const {
    itemsInProductlist,
    dispatch: productlistDispatch,
  } = useProductlist();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();
  return (
    <>
      <h1>Products </h1>
      <div className="sideBar">
        <input
          type="radio"
          name="sort"
          onChange={() => productlistDispatch({ type: "HIGH_TO_LOW" })}
        />
        high to low
        <input
          type="radio"
          name="sort"
          onChange={() => productlistDispatch({ type: "LOW_TO_HIGH" })}
        />
        low to high
      </div>

      <div className="component-container card-div">
        {itemsInProductlist.map((item) => {
          return (
            <div
              key={item._id}
              className="card"
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
                className="button primary-button"
                onClick={() =>
                  cartDispatch({
                    type: "ADD_TO_CART",
                    payload: item,
                  })
                }
              >
                Add to Cart
              </button>

              <button
                className="button secondary-button"
                onClick={() =>
                  wishlistDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: item,
                  })
                }
              >
                Add to Wishlist
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
