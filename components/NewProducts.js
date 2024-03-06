import Center from "./Center";
import classes from "./NewProducts.module.css";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  const firstSixProducts = products.slice(0, 6);

  return (
    <Center>
      <p className={classes.arrivals}>New Arrivals</p>
      <ProductsGrid products={firstSixProducts} />
    </Center>
  );
}
