import React from "react";
import { useRoutes } from "react-router-dom";
import SignOn from "../pages/SignOn";
import Dashboard from "../pages/Dashboard";
const AppRoutes: React.FC = () => {
    let element = useRoutes([
        { path: '/', element: <SignOn/> },
        { path: '/dashboard', element: <Dashboard/>},
    ]);
    return element;
};

export default AppRoutes;