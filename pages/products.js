import { mongooseConnect } from "@/lib/mongoose";
import Center from "../components/Center";
import Header from "../components/Header";
import classes from "./products.module.css";
import { Product } from "@/models/Product";
import ProductsGrid from "../components/ProductsGrid";

export default function Products({ products }) {
  return (
    <>
      <Header />
      <Center>
        <h2 className={classes.heading}>All products</h2>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getStaticProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 60,
  };
}
