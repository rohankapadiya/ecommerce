import ProductBox from "./ProductBox";

import classes from "./ProductsGrid.module.css";

export default function ProductsGrid({ products }) {
  return (
    <div className={classes.center}>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </div>
  );
}
