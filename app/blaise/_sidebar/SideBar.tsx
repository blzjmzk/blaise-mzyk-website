import Link from "next/link";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <aside className={styles.sidePanel}>
      <ul>
        <li className={styles.sideItem}>
          <Link href="/blaise/posts" className={styles.sideLink}>
            Add Posts
          </Link>
        </li>
        <li className={styles.sideItem}>
          <Link href="/blaise/projects" className={styles.sideLink}>
            Add Projects
          </Link>
        </li>
        <li className={styles.sideItem}>
          <Link href="/blaise/book-notes" className={styles.sideLink}>
            Add Book Notes
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
