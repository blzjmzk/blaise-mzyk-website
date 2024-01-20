import { PropsWithChildren } from "react";
import styles from "./SectionHeading.module.css";

const SectionHeading = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.headingText}>{children}</h2>
    </div>
  );
};

export default SectionHeading;

//
// <h2 className={styles.headingText}>{children}</h2>
// <div className={styles.headingHighlight} />
//
