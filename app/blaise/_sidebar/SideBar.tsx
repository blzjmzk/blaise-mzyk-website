import Link from "next/link";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <aside className={styles.sidepanel}>
      <ul>
        <li>
          <Link href="/blaise/posts" className={styles.sideLink}>
            Add Posts
          </Link>
        </li>
        <li>
          <Link href="/blaise/projects" className={styles.sideLink}>
            Add Posts
          </Link>
        </li>
        <li>
          <Link href="/blaise/book-notes" className={styles.sideLink}>
            Add Posts
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
