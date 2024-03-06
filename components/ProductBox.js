import Link from "next/link";
import Button from "./Button";
import classes from "./ProductBox.module.css";
import { useContext } from "react";
import { CartContext } from "./CartContext";
export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);
  return (
    <div className={classes.wrapper}>
      <Link className={classes.box} href={url}>
        <img src={images[0]} alt={title} className={classes.img} />
      </Link>
      <Link className={classes.h2} href={url}>
        {title}
      </Link>
      <div className={classes.row}>
        <p className={classes.price}>${price}</p>
        <Button blue outline onClick={() => addProduct(_id)}>
          <p className={classes.addcart}>Add to cart</p>
        </Button>
      </div>
    </div>
  );
}
