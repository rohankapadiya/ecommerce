import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import classes from "../categories.module.css";

export default function CategoryProducts({ products, category }) {
  //console.log(products, categories);
  return (
    <>
      <Header />
      <Center>
        <div>
          <h2 className={classes.heading}>{category}</h2>
          <ProductsGrid products={products} />
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const products = await Product.find({});
  const categories = await Category.find({});
  const categoriesObj = JSON.parse(JSON.stringify(categories));

  const currentCategory = categoriesObj.filter(
    (obj) => obj.name.toLowerCase() === id
  );

  const parentCategoryToFind = categoriesObj.filter(
    (obj) => obj.parentCategory === currentCategory[0]._id
  );
  let combineCategory = currentCategory.concat(parentCategoryToFind);
  const extractedCategoryIds = combineCategory.map(({ _id }) => _id);

  const foundedProducts = [];
  const productsWithMatchingCategories = products.map((product) => {
    if (extractedCategoryIds.includes(product.category.toString())) {
      foundedProducts.push(product);
    }
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(foundedProducts)),
      category: currentCategory[0].name,
    },
  };
}
