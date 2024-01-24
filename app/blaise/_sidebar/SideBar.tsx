import Link from "next/link";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <aside className={styles.sidePanel}>
      <ul>
        <li className={styles.sideItem}>
          <Link href="/blaise" className={styles.sideLink}>
            Posts
          </Link>
        </li>
        <li className={styles.sideItem}>
          <Link href="/blaise/projects" className={styles.sideLink}>
            Projects
          </Link>
        </li>
        <li className={styles.sideItem}>
          <Link href="/blaise/book-notes" className={styles.sideLink}>
            Book Notes
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
