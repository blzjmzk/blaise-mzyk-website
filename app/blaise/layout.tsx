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
        <span className={styles.adminPanelHeader}>Admin Panel</span>
        <ul className={styles.adminPanelList}>
          <li className={styles.adminItem}>
            <span>
              <Link href="/blaise" className={styles.adminLink}>
                Posts
              </Link>
            </span>
          </li>
          <li className={styles.adminItem}>
            <span>
              <Link href="/blaise/projects" className={styles.adminLink}>
                Projects
              </Link>
            </span>
          </li>
          <li className={styles.adminItem}>
            <span>
              <Link href="/blaise/book-notes" className={styles.adminLink}>
                Book Notes
              </Link>
            </span>
          </li>
          {status === "authenticated" && (
            <li className={styles.adminItem}>
              <span>
                <Link href="/api/auth/signout" className={styles.adminLink}>
                  Sign Out
                </Link>
              </span>
            </li>
          )}
        </ul>
      </Header>
      <div className={styles.workSpace}>{children}</div>
    </>
  );
};

export default AdminLayout;
