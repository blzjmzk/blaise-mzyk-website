import { PropsWithChildren, ReactNode } from "react";
import styles from "./CategoryBadge.module.css";
import { CodeBlock, Student } from "@phosphor-icons/react/dist/ssr";

interface Props {
  children: ReactNode;
  categoryName: string;
}

const icons = {
  Programming: <CodeBlock size={18} />,
  Studying: <Student size={18} />,
};

const CategoryBadge = ({ children, categoryName }: Props) => {
  const icon = icons[categoryName as keyof typeof icons] || "";

  return (
    <span className={styles.badge}>
      {icon}
      {children}
    </span>
  );
};

export default CategoryBadge;
