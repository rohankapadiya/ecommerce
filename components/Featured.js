import Center from "./Center";
import classes from "./Featured.module.css";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({ featuredProduct }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(featuredProduct._id);
  }
  return (
    <div className={classes.mainDiv}>
      <Center>
        <div className={classes.wrapperdiv}>
          <div className={classes.leftdiv}>
            <h1>{featuredProduct.title}</h1>
            <p className={classes.text}>{featuredProduct.description}</p>
            <div
              className={classes.buttons}
              style={{ display: "flex", gap: "5px", margin: "10px 0px" }}
            >
              <Link href={"/product/" + featuredProduct._id}>
                <Button white outline size="l">
                  Read more
                </Button>
              </Link>
              <Button primary size="l" onClick={addFeaturedToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-1 h-1"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to cart
              </Button>
            </div>
          </div>
          <div>
            <img
              className={classes.image}
              src="https://rohan-ecommerce-admin.s3.amazonaws.com/1704792690369.png"
              alt="Macbook pro image"
            />
          </div>
        </div>
      </Center>
    </div>
  );
}
