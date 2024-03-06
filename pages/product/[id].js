import { mongooseConnect } from "@/lib/mongoose";
import Center from "../../components/Center";
import Header from "../../components/Header";
import { Product } from "@/models/Product";
import classes from "./[id].module.css";
import ProductImages from "../../components/ProductImages";
import Button from "../../components/Button";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <div className={classes.colWrapper}>
          <div className={classes.box}>
            <ProductImages images={product.images} />
          </div>
          <div>
            <h1>{product.title}</h1>
            <p className={classes.description}>{product.description}</p>
            <div className={classes.priceSection}>
              ${product.price}
              <Button primary size="l" onClick={() => addProduct(product._id)}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
