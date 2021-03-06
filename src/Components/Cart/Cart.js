import { useCart } from "../../context/cart-context";

export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  let pricesOfItems = itemsInCart.map((item) => item.price * item.quantity);
  return (
    <>
      <h1>Cart </h1>
      <div className="checkoutBox">
        Total: Rs.{pricesOfItems.reduce((a, b) => a + b, 0)}<br/>
        <button className="button primary-button">Checkout</button>
      </div>
      <div className="component-container card-div">
        {itemsInCart.map((item) => {
          return (
            <div
              key={item._id}
              style={{
                border: "1px ",
                margin: "1rem",
                padding: "1rem",
                boxShadow: "5px 10px 5px #F3F4F6",
                width: "300px",
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
                onClick={() => {
                  item.quantity === 0
                    ? cartDispatch({ type: "REMOVE", payload: item })
                    : cartDispatch({ type: "DECREMENT", payload: item });
                }}
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
