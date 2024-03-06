import { Product } from "@/models/Product";
import Featured from "../components/Featured";
import Header from "../components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "../components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured featuredProduct={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredProductID = "659d0fe498b9f7e1cec11f48";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductID);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 60,
  };
}
