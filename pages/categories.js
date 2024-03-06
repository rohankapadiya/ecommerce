import Center from "@/components/Center";
import Header from "@/components/Header";
import classes from "./categories.module.css";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import CategoryBox from "@/components/CategoryBox";

export default function Categories({ categories }) {
  return (
    <>
      <Header />
      <Center>
        <h2 className={classes.heading}>Categories</h2>
        <div className={classes.catgrid}>
          {categories?.length > 0 &&
            categories.map((cat) => (
              <CategoryBox key={cat.name}>{cat.name} </CategoryBox>
            ))}
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({});
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
