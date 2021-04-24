import { useState, useEffect } from "react";
import { useCart } from "./context/cart-context";
import { useWishlist } from "./context/wishlist-context";
import { useProductlist } from "./context/productlist-context";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [route, setRoute] = useState("products");
  const { Wishlist } = useWishlist();
  const { Products, dispatch: productlistDispatch } = useProductlist();
  const { Cart } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/products");
        productlistDispatch({
          type: "ADD_TO_PRODUCTLIST",
          payload: response.data.products
        });
      } catch (error) {
        console.error("error", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <nav class="nav-main nav-primary">
        <div class="nav--logo">
          <p>HD </p>
        </div>
        <ul class="list nav--list">
          <li class="nav-item" onClick={() => setRoute("products")}>
            PRODUCTS
          </li>
          <li class="nav-item" onClick={() => setRoute("cart")}>
            CART
          </li>
          <li class="nav-item" onClick={() => setRoute("wishlist")}>
            WISHLIST
          </li>
        </ul>
      </nav>

      {route === "products" && <Products />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist />}
    </div>
  );
}
