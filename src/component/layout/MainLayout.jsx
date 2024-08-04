import { Outlet } from "react-router-dom";
import MainNavigation from "../MainNavigation";

const MainLayout = () => {

  return (
    <div className="min-h-screen">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
