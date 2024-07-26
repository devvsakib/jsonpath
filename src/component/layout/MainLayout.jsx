import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MainNavigation from "../MainNavigation";
const { Header, Content } = Layout;

const MainLayout = () => {

  return (
    <Layout style={{ height: "100%" }}>
      <MainNavigation>
      </MainNavigation>
      <main>
        <Outlet />
      </main>
    </Layout>
  );
};

export default MainLayout;
