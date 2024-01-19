import { PropsWithChildren } from "react";
import styles from "./Header.module.css";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerText}>{children}</h1>
    </header>
  );
};

export default Header;
