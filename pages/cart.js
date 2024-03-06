import Header from "../components/Header";
import classes from "./cart.module.css";
import classes2 from "../components/Table.module.css";
import Center from "../components/Center";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("./api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreProduct(id) {
    addProduct(id);
  }

  function lessProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    if (email.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
      return;
    }
    const res = await axios.post("./api/checkout", {
      name,
      email,
      streetAddress,
      city,
      postalCode,
      country,
      cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <div>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </div>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <div className={classes.wrapper}>
          <div className={classes.box}>
            <h2 className={classes.heading}>Cart</h2>

            {!cartProducts?.length && <div>Your cart is empty</div>}
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className={classes2.productInfo}>
                        <div className={classes2.productImageBox}>
                          <img src={product.images[0]} />
                        </div>
                        {product.title}
                      </td>
                      <td>
                        <Button
                          secondary
                          onClick={() => lessProduct(product._id)}
                        >
                          -
                        </Button>
                        <span className={classes2.quantity}>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </span>
                        <Button
                          secondary
                          onClick={() => moreProduct(product._id)}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className={classes.box}>
              <h2>Order information</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {isEmpty && (
                <p className={classes.notValid}>* Email is required.</p>
              )}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <div className={classes.cityHolder}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button primary block onClick={goToPayment}>
                Continue to payment
              </Button>
            </div>
          )}
        </div>
      </Center>
    </>
  );
}
