import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import { useProductlist } from "../../context/productlist-context";

export function Products() {  
    const {
      itemsInProductlist,
      dispatch: productlistDispatch,
    } = useProductlist();
    const { dispatch: cartDispatch } = useCart();
    const { dispatch: wishlistDispatch } = useWishlist();
    return (
      <>
        <h1>Perfumes </h1>
        <div>
          Sort by price
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
                  width:"300px"
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
  