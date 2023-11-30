import {
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { GrTest } from "react-icons/gr";
import useReservation from "../../hooks/reservation/useReservation";
import useIsActive from "../../hooks/useIsActive";
import useIsAdmin from "../../hooks/useIsAdmin";

export default function Sidebar() {
  const { user } = useAuth();

  const [open, setOpen] = useState(0)
  const { data: reservations = [] } = useReservation()

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const {isAdmin} = useIsAdmin()
  // console.log(isAdmin)

  const {isActive} = useIsActive()



  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      {isAdmin ? (
        <>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Admin <span className="text-green-500">DashBoard</span>
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
                    value={reservations?.length}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </NavLink>


            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">

                  <Typography as="span" color="blue-gray" className="flex justify-start font-normal">
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink to='/dashboard/admin/addBanner'>
                    <ListItem>
                      <ListItemPrefix>
                        <MdOutlineAddPhotoAlternate className="h-5 w-5" />
                      </ListItemPrefix>
                      Add banner
                    </ListItem>
                  </NavLink>
                  <NavLink to='/dashboard/admin/allBanners'>
                    <ListItem>
                      <ListItemPrefix>
                        <CiImageOn className="h-5 w-5" />
                      </ListItemPrefix>
                      All Banners
                    </ListItem>
                  </NavLink>

                  <NavLink to="/dashboard/admin/recommendation">
                  <ListItem>
                    <ListItemPrefix>
                      <HeartIcon strokeWidth={3} className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Recommendation
                  </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

          </List>
        </>
      ) : (
        <>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Hi! <span className="text-green-500">{user?.displayName}</span>
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
            
          </List>
        </>
      )}
    </Card>
  );
}
