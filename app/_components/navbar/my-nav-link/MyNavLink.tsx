import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "../NavBar.module.css";

interface Props {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const MyNavLink = ({ href, onClick, children }: Props) => {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${
        href === currentPath ? styles.activeNavLink : styles.nonActiveNavLink
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MyNavLink;
