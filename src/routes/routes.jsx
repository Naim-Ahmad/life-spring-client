import { createBrowserRouter } from "react-router-dom";
import axios from "../config/axios.config";
import Dashboard from "../layouts/dashboard/Dashboard";
import MainLayout from "../layouts/mainLayout/MainLayout";
import AddTest from "../pages/admin/addTest/AddTest";
import AllUsers from "../pages/admin/allUsers/AllUsers";
import Reservation from "../pages/admin/reservation/Reservation";
import AllTests from "../pages/allTests/AllTests";
import Home from "../pages/home/Home";
import LogIn from '../pages/logIn/LogIn';
import Register from "../pages/register/Register";
import SeeDetails from "../pages/seeDetails/SeeDetails";
import MyProfile from "../pages/user/myprofile/MyProfile";
import TestResult from "../pages/user/testResult/TestResult";
import UpComingAppointment from "../pages/user/upcoming/UpComingAppointment";
import PrivateRoute from './PrivateRoute';

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
            element: <LogIn/>
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
            element: <AllTests/>
        },
        {
            path: `tests/seeDetails/:id`,
            element: <PrivateRoute><SeeDetails/></PrivateRoute>,
            loader: async ({params})=> {
               const res = await axios.get(`/tests/${params.id}`)
               return res.data;
            }
        },
        {
            path: 'dashboard',
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                {
                    path:'upComingAppointment',
                    element: <UpComingAppointment/>
                },
                {
                    path:'profile',
                    element: <MyProfile/>
                },
                {
                    path:'testResult',
                    element: <TestResult/>
                },

                /*********  admin  **********/
                {
                    path:'admin/allTests',
                    element: <AllTests/>
                },
                {
                    path:'admin/allUsers',
                    element: <AllUsers/>
                },
                {
                    path:'admin/reservation',
                    element: <Reservation/>
                },
                {
                    path:'admin/addTest',
                    element: <AddTest/>
                },
            ]
        }
        
    ]
}])

export default router;