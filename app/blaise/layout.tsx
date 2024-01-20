import { ReactNode } from "react";
import Header from "../components/header";
import Link from "next/link";
import SideBar from "./_sidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Header>Admin Panel</Header>
      <div className="flex">
        <SideBar />
        <div>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
