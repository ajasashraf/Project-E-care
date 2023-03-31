import React, { useState, createContext } from "react";
import DoctorList from "../../../components/AdminComponents/DoctorList/DoctorList";
import Table from "../../../components/AdminComponents/Table/Table";
import NewDoctors from "../../../components/AdminComponents/newDoctorsList/newDoctors";
import "./Home.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillDashboard } from "react-icons/ai";
import AddDepartment from "../../../components/AdminComponents/AddDepartment/AddDepartment";
import Departments from "../../../components/AdminComponents/departmentTable/Departments";
import DashboardAdmin from "../../../components/AdminComponents/Dashboard/DashboardAdmin";
import {
  FaBuilding,
  FaRegChartBar,
  FaStethoscope,
  FaUsers,
} from "react-icons/fa";
import SalesReport from "../../../components/AdminComponents/SalesReport/SalesReport";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const option = [
  {
    page: "Dashboard",
    path: "dashboard",
  },
  {
    page: "Users",
    path: "users",
  },
  {
    page: "Doctors",
    path: "doctors",
  },
  {
    page: "New Doctors",
    path: "newDoctors",
  },
  {
    page: "Departments",
    path: "departments",
  },
  {
    page: "Add Department",
    path: "addDepartment",
  },
  {
    page: "Sales",
    path: "sales",
  },
];

export const sideBarContext = createContext("user");
export const adminLoading = createContext("");

function AdminHome() {
  const [path, setPath] = useState("dashboard");
  const [adminLoad, setAdminLoad] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function changePath(x) {
    setPath(x);
  }
  function changeLoading(x) {
    setAdminLoad(x);
  }
  return (
    <adminLoading.Provider value={{ adminLoad, changeLoading }}>
      <sideBarContext.Provider value={{ path, changePath }}>
        <>
          {adminLoad && (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
          <div className="admin-home">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                open={open}
                style={{
                  justifyContent: "center",
                  alignItems: "start",
                  backgroundColor: "#ffff",
                }}
              >
                <Toolbar>
                  <IconButton
                    color="black"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                  >
                    <MenuIcon />
                  </IconButton>
                  {!open && (
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      style={{ color: "black" }}
                    >
                      <img
                        src="\Images\e-care-high-resolution-logo-color-on-transparent-background (1).png"
                        alt=""
                        width={80}
                        height={80}
                      />
                    </Typography>
                  )}
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  {open && (
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      style={{ color: "black" }}
                      className="mx-auto my-auto mt-4"
                    >
                      <img
                        src="\Images\e-care-high-resolution-logo-color-on-transparent-background (1).png"
                        alt=""
                        width={80}
                        height={80}
                      />
                    </Typography>
                  )}
                </DrawerHeader>
                <Divider />
                <IconButton onClick={handleDrawerClose} className="ms-auto">
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
                <List>
                  {option.map((page) => (
                    <ListItem
                      key={page.page}
                      disablePadding
                      onClick={() => setPath(page.path)}
                      className={`${
                        page.path === path ? "bg-gray-300 " : ""
                      } p-2`}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          {page.page === "Users" && (
                            <FaUsers className="h-6 w-6" />
                          )}
                          {page.page === "Dashboard" && (
                            <AiFillDashboard className="h-6 w-6" />
                          )}
                          {page.page === "Doctors" && (
                            <FaStethoscope className="h-6 w-6" />
                          )}
                          {page.page === "New Doctors" && (
                            <FaStethoscope className="h-6 w-6" />
                          )}
                          {page.page === "Departments" && (
                            <FaBuilding className="h-6 w-6" />
                          )}
                          {page.page === "Add Department" && (
                            <FaBuilding className="h-6 w-6" />
                          )}
                          {page.page === "Sales" && (
                            <FaRegChartBar className="h-6 w-6" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={page.page} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
              </Drawer>
              <Main open={open}>
                <DrawerHeader />
                <h1 className="department-subheading ml-2 mt-3 mb-3">
                  {path === "dashboard" && "Dashboard"}
                  {path === "users" && "Users"}
                  {path === "doctors" && "Doctors"}
                  {path === "newDoctors" && "New Doctors"}
                  {path === "addDepartment" && "Add Department"}
                  {path === "departments" && "Departments"}
                  {path === "sales" && "Sales"}
                </h1>
                <div className="home-container">
                  {path === "dashboard" && <DashboardAdmin />}
                  {path === "users" && <Table />}
                  {path === "doctors" && <DoctorList />}
                  {path === "newDoctors" && <NewDoctors />}
                  {path === "addDepartment" && <AddDepartment />}
                  {path === "departments" && <Departments />}
                  {path === "sales" && <SalesReport />}
                </div>
              </Main>
            </Box>
          </div>
        </>
      </sideBarContext.Provider>
    </adminLoading.Provider>
  );
}

export default AdminHome;
