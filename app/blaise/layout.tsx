import Link from "next/link";
import { PropsWithChildren } from "react";
import Header from "../_components/header";
import styles from "./Layout.module.css";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header>
        <ul className={styles.adminPanel}>
          <li className={styles.adminItem}>Admin Panel</li>
          <li className={styles.adminItem}>
            <Link href="/blaise" className={styles.adminLink}>
              Posts
            </Link>
          </li>
          <li className={styles.adminItem}>
            <Link href="/blaise/projects" className={styles.adminLink}>
              Projects
            </Link>
          </li>
          <li className={styles.adminItem}>
            <Link href="/blaise/book-notes" className={styles.adminLink}>
              Book Notes
            </Link>
          </li>
        </ul>
      </Header>
      <div className={styles.workSpace}>{children}</div>
    </>
  );
};

export default AdminLayout;
