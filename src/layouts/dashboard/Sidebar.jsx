import {
  ArrowPathRoundedSquareIcon,
  Cog6ToothIcon,
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { GrTest } from "react-icons/gr";

export default function Sidebar() {
  const { user } = useAuth();
  const isAdmin = true;
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      {isAdmin ? (
        <>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Admin DashBoard
            </Typography>
          </div>
          <List>
            <NavLink to="/dashboard/admin/allUsers">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                All Users
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/admin/addTest">
              <ListItem>
                <ListItemPrefix>
                  <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                </ListItemPrefix>
                Add a test
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/admin/allTests">
              <ListItem>
                <ListItemPrefix>
                  <GrTest className="h-5 w-5" />
                </ListItemPrefix>
                All Tests
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/admin/reservation">
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Reservation
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </NavLink>

            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Hi! {user?.displayName}
            </Typography>
          </div>
          <List>
            <NavLink to="/dashboard/profile">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/upComingAppointment">
              <ListItem>
                <ListItemPrefix>
                  <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                </ListItemPrefix>
                Up Coming Appointment
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/testResult">
              <ListItem>
                <ListItemPrefix>
                  <GrTest className="h-5 w-5" />
                </ListItemPrefix>
                Test Result
              </ListItem>
            </NavLink>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </List>
        </>
      )}
    </Card>
  );
}
