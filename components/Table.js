import classes from "./Table.module.css";

export default function Table({ children }) {
  return <table className={classes.table}>{children}</table>;
}
 