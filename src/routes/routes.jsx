import { Login } from "@mui/icons-material";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";

const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: 'logIn',
            element: <Login/>
        },
        {
            path:'register',
            element: <Register/>
        },
        {
            path:'about',
            element: <Register/>
        },
        {
            path:'allTest',
            element: <Register/>
        },
        {
            path:'userDashboard',
            element: <Register/>
        },
        {
            path:'adminDashboard',
            element: <Register/>
        },
    ]
}])

export default router;