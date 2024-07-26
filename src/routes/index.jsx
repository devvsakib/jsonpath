import { createBrowserRouter } from "react-router-dom";
import CustomJSONTree from "../pages/CustomJSONTree";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import MainLayout from "../component/layout/MainLayout";
import QB from "../pages/QB";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/jsontree",
                element: <CustomJSONTree />,
            },
            {
                path: "/landingpage",
                element: <LandingPage />,
            },
            {
                path: "/querybuilder",
                element: <QB />,
            },
        ]
    },

]);

export default router;
