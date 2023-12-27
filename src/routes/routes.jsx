import { createBrowserRouter } from "react-router-dom";
import axios from "../config/axios.config";
import Dashboard from "../layouts/dashboard/Dashboard";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Blogs from "../pages/Blogs/Blogs";
import AddTest from "../pages/admin/addTest/AddTest";
import AllUsers from "../pages/admin/allUsers/AllUsers";
import AdminAllTests from "../pages/admin/alltests/AllTests";
import Reservation from "../pages/admin/reservation/Reservation";
import AddBanner from "../pages/admin/settings/AddBanner";
import AllBanners from "../pages/admin/settings/AllBanners";
import Recommendation from "../pages/admin/settings/Recommendation";
import AllTests from "../pages/allTests/AllTests";
import Contacts from "../pages/contacts/Contacts";
import Doctors from "../pages/doctors/Doctors";
import Home from "../pages/home/Home";
import LogIn from '../pages/logIn/LogIn';
import Register from "../pages/register/Register";
import SeeDetails from "../pages/seeDetails/SeeDetails";
import MyProfile from "../pages/user/myprofile/MyProfile";
import TestResult from "../pages/user/testResult/TestResult";
import UpComingAppointment from "../pages/user/upcoming/UpComingAppointment";
import AdminRoute from "./AdminRoute";
import BlockedRoute from "./BlockedRoute";
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'logIn',
                element: <LogIn />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'blogs',
                element: <Blogs />
            },
            {
                path: 'doctors',
                element: <Doctors />
            },
            {
                path: 'contact',
                element: <Contacts />
            },
            {
                path: 'allTest',
                element: <AllTests />
            },
            {
                path: `tests/seeDetails/:id`,
                element: <PrivateRoute><BlockedRoute><SeeDetails /></BlockedRoute></PrivateRoute>,
                loader: async ({ params }) => {
                    const res = await axios.get(`/tests/${params.id}`)
                    return res.data;
                }
            },


        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <BlockedRoute><Dashboard /></BlockedRoute></PrivateRoute>,
        children: [
            {
                path: 'upComingAppointment',
                element: <UpComingAppointment />
            },
            {
                path: 'profile',
                element: <MyProfile />
            },
            {
                path: 'testResult',
                element: <TestResult />
            },

            /*********  admin  **********/
            {
                path: 'admin/allTests',
                element: <AdminRoute> <AdminAllTests /></AdminRoute>
            },
            {
                path: 'admin/allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'admin/reservation',
                element: <AdminRoute><Reservation /></AdminRoute>
            },
            {
                path: 'admin/addTest',
                element: <AdminRoute> <AddTest /></AdminRoute>
            },
            {
                path: 'admin/addBanner',
                element: <AdminRoute><AddBanner /></AdminRoute>
            },
            {
                path: 'admin/allBanners',
                element: <AdminRoute><AllBanners /></AdminRoute>
            },
            {
                path: 'admin/recommendation',
                element: <AdminRoute><Recommendation /></AdminRoute>
            },
        ]
    }
])

export default router;