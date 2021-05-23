import {useWishlist} from "../../context/wishlist-context";
import {useCart} from "../../context/cart-context";

export function Wishlist() {
    const { itemsInWishlist, dispatch: wishlistDispatch } = useWishlist();
    const {dispatch: cartDispatch} = useCart();
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
                  width: "300px"
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
                    {cartDispatch({ type: "ADD_TO_CART", payload: item });
                    wishlistDispatch({ type: "REMOVE", payload: item })}
                  }
                >
                  Move to Cart
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
  