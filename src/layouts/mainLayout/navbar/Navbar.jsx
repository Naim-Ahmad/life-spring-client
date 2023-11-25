import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  console.log(user)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navItems = [
    { value: "Home", route: "/" },
    { value: "About", route: "/about" },
    { value: "Contact", route: "/contact" },
    { value: "All Test", route: "/allTest" },
    user && { value: "Dashboard", route: "/dashboard" },
  ];

  console.log(user)

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Life Spring
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Life Spring
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <NavLink key={item.value} to={item.route}>
                <Button sx={{ color: "#fff" }}>{item.value}</Button>
              </NavLink>
            ))}
            {user ? (
              <Button variant="contained" color="secondary">
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="outlined"
                    sx={{ mr: "10px" }}
                    color="secondary"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/logIn">
                  <Button variant="contained" color="secondary">
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
