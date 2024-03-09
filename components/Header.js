import Link from "next/link";
import classes from "./Header.module.css";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import NavLogo from "./logo/NavLogo";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <header className={classes.header}>
      <Center>
        <div className={classes.center}>
          <Link href={"/"} className={classes.logo}>
            Ecommerce
          </Link>
          <>
            <nav className={classes.navbarDesktop}>
              <Link href={"/"} className={classes.navlinks}>
                Home
              </Link>
              <Link href={"/products"} className={classes.navlinks}>
                All products
              </Link>
              <Link href={"/categories"} className={classes.navlinks}>
                Categories
              </Link>
              {/* <Link href={"/account"} className={classes.navlinks}>
                Account
              </Link> */}
              <Link href={"/cart"} className={classes.navlinks}>
                Cart ({cartProducts.length})
              </Link>
            </nav>
            <>
              {mobileNavActive && (
                <nav className={classes.navbar}>
                  <Link href={"/"} className={classes.navlinks}>
                    Home
                  </Link>
                  <Link href={"/products"} className={classes.navlinks}>
                    All products
                  </Link>
                  <Link href={"/categories"} className={classes.navlinks}>
                    Categories
                  </Link>
                  <Link href={"/cart"} className={classes.navlinks}>
                    Cart ({cartProducts.length})
                  </Link>
                </nav>
              )}
              <button
                className={classes.navLogo}
                onClick={() => setMobileNavActive((prev) => !prev)}
              >
                <NavLogo />
              </button>
            </>
          </>
        </div>
      </Center>
    </header>
  );
}
