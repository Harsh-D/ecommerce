import { useEffect } from "react";
import { useCart } from "./context/cart-context";
import { useWishlist } from "./context/wishlist-context";
import { useProductlist } from "./context/productlist-context";
import axios from "axios";
import { Routes, Route, NavLink } from "react-router-dom";
import "./styles.css";

export default function App() {
  const { Wishlist } = useWishlist();
  const { Products, dispatch: productlistDispatch } = useProductlist();
  const { Cart } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://doing-it-live-mongoose-1704.harshdeshpande1.repl.co/products/"
        );
        productlistDispatch({
          type: "ADD_TO_PRODUCTLIST",
          payload: response.data.products,
        });
      } catch (error) {
        console.error("error", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <nav className="nav-main nav-primary">
        <div className="nav--logo">
          <p>
            Log<sub>N</sub>Shop{" "}
          </p>
        </div>
        <ul className="list nav--list">
          <li className="nav-item">

            <NavLink
              end
              to="/products"
              className= "NavElement"
              activeStyle={{
                fontWeight: "bold",
                
              }}
            >
              PRODUCTS
            </NavLink>
          </li>
          <li className="nav-item" style={{textDecoration:"none"}}>
            <NavLink
              to="/cart"
              className= "NavElement"
              activeStyle={{
                fontWeight: "bold",

              }}
            >
              CART
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink
              to="/wishlist"
              className= "NavElement"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              WISHLIST
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
    </div>
  );
}
