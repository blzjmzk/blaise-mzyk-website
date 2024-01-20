import { PropsWithChildren } from "react";
import Header from "../components/header";
import SideBar from "./_sidebar";
import styles from "./Layout.module.css";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header>Admin Panel</Header>
      <div className={styles.adminPanel}>
        <SideBar />
        <div className={styles.workSpace}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
