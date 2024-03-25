import { PropsWithChildren } from "react";
import styles from "./CategoryBadge.module.css";
import { Student } from "@phosphor-icons/react/dist/ssr";

const CategoryBadge = ({ children }: PropsWithChildren) => {
  return (
    <span className={styles.badge}>
      <Student size={18} color="var(--color-white)" />
      {children}
    </span>
  );
};

export default CategoryBadge;
