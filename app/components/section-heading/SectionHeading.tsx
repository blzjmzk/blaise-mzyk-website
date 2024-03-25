import { PropsWithChildren } from "react";
import styles from "./SectionHeading.module.css";

const SectionHeading = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.container}>
      <h2 className={styles.headingText}>{children}</h2>
    </header>
  );
};

export default SectionHeading;
