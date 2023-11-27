import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import toast from "react-hot-toast";
import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";
import Footer from "../footer/Footer";

export default function MainLayout() {
  const [openNav, setOpenNav] = React.useState(false);

  const { user, logOut } = useAuth();

  // React.useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth <= 100 && setOpenNav(false)
  //   );
  // }, []);

  const handleSignOut = () => {
    const toastId = toast.loading("Loading...");
    logOut()
      .then(() => {
        toast.success("Log out successful", {
          id: toastId,
        });
      })
      .catch((err) => {
        // setLoading(false)
        toast.error(err.message, {
          id: toastId,
        });
        console.log(err);
      });
  };

  const navItems = [
    { value: "Home", route: "/" },
    { value: "All Test", route: "/allTest" },
    user ? { value: "Dashboard", route: "/dashboard" } : null,
  ];


  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map(
        (item) =>
          item && (
            <NavLink to={item?.route} key={item?.value} >
              <Typography
                as="li"
                variant="small"
                className="p-1 font-medium"
              >
                {item?.value}
              </Typography>
            </NavLink>
          )
      )}
    </ul>
  );

  const avatarURL = "https://i.ibb.co/3SsNCnk/logo-removebg-preview.png"

  return (
    <div className="max-h-[768px]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <Typography
              as="span"
              className="mr-4 cursor-pointer py-1.5 font-bold text-xl flex gap-1"
            >
              <Avatar src={avatarURL} alt="avatar" size="xs" className=" w-8" /> Life <Typography as="span" color="green" className="font-bold text-xl">Spring</Typography>
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <div className="flex items-center gap-x-1">
              {user ? (
                <Button
                  variant="gradient"
                  size="sm"
                  color="green"
                  onClick={handleSignOut}
                  className="hidden lg:inline-block"
                >
                  <span>Sign Out</span>
                </Button>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outlined"
                      size="sm"
                      color="green"
                      className="hidden lg:inline-block"
                    >
                      <span>Sign Up</span>
                    </Button>
                  </Link>

                  <Link to="/logIn">
                    <Button
                      variant="gradient"
                      color="green"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span>Sign in</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Link to="/register">
              <Button fullWidth color="green" variant="text" size="sm" className="">
                <span>Sign Up</span>
              </Button>
            </Link>
            <Link to="logIn">
              <Button fullWidth color="green" variant="gradient" size="sm" className="">
                <span>Sign in</span>
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
