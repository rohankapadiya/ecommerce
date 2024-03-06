import Link from "next/link";
import Button from "./Button";
import classes from "./CategoryBox.module.css";

export default function CategoryBox({ children }) {
  const url = "/categories/" + children[0].toLowerCase();

  return (
    <div className={classes.box}>
      {children}{" "}
      <Link href={url}>
        <Button primary>Visit now!</Button>
      </Link>
    </div>
  );
}
