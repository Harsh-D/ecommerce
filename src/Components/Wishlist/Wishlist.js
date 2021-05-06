import {useWishlist} from "../../context/wishlist-context";

export function Wishlist() {
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
  