"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Header from "../_components/header";
import styles from "./Layout.module.css";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { status, data: session } = useSession();
  return (
    <>
      <Header>
        <h2 className={styles.adminPanelHeader}>Admin Panel</h2>
        <ul className={styles.adminPanelList}>
          <li className={styles.adminItem}>
            <h3>
              <Link href="/blaise" className={styles.adminLink}>
                Posts
              </Link>
            </h3>
          </li>
          <li className={styles.adminItem}>
            <h3>
              <Link href="/blaise/projects" className={styles.adminLink}>
                Projects
              </Link>
            </h3>
          </li>
          <li className={styles.adminItem}>
            <h3>
              <Link href="/blaise/book-notes" className={styles.adminLink}>
                Book Notes
              </Link>
            </h3>
          </li>
          {status === "authenticated" && (
            <li className={styles.adminItem}>
              <h3>
                <Link href="/api/auth/signout" className={styles.adminLink}>
                  Sign Out
                </Link>
              </h3>
            </li>
          )}
        </ul>
      </Header>
      <div className={styles.workSpace}>{children}</div>
    </>
  );
};

export default AdminLayout;
