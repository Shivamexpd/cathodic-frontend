import React from "react";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Logout from "../auth/Logout";
import Projects from "./Projects";
import Map from "./Map";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { userAction } from "../Redux/actions/userActions";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: -2,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    padding: theme.spacing(0),
    backgroundColor: "#29323C",
    height: "100%",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Screen = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mapButton, setMapButton] = React.useState(false);
  const [openTab, setOpenTab] = React.useState("Projects");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userRole, setUserRole] = React.useState("admidn");

  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  
  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const callbackIcon = (text) => {
    if (text === "Projects") {
      return <HomeIcon />;
    } else if (text === "Map") {
      return <MapIcon />;
    } else if (text === "Save Config") {
      return <SettingsIcon />;
    } else if (text === "Admin") {
      return <SupervisorAccountIcon />;
    }
  };
  const callbackListItem = (text) => {
    if (text === "Map") {
      return mapButton ? "flex" : "none";
    } else if (text === "Admin") {
      return userRole === "admin" ? "flex" : "none";
    } else {
      return "flex";
    }
  };


  return (
    <>
      {isAuthenticated ? (
        <div className={classes.root}>
          <Drawer
            style={{ backgroundColor: "#000" }}
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              }),
            }}
          >
            <div className={classes.toolbar}>
              {drawerOpen ? (
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: drawerOpen,
                  })}
                >
                  <MenuIcon />
                </ IconButton>
              )}
            </div>
            <Divider />
            <List>
              {["Projects", "Map", "Save Config", "Admin"].map(
                (text, index) => {
                  return (
                    <ListItem
                      button
                      key={text}
                      onClick={(e) => setOpenTab(text)}
                      style={{ display: callbackListItem(text) }}
                    >
                      <ListItemIcon onClick={(e) => setOpenTab(text)}>
                        {callbackIcon(text)}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                }
              )}
            </List>

            <div style={{ position: "absolute", bottom: 7, left: 8 }}>
              <Avatar
                src={user.picture}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              ></Avatar>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <Logout />
              </Menu>
            </div>
          </Drawer>

          <main className={classes.content}>
            <Projects
              openTab={openTab}
              setOpenTab={setOpenTab}
              drawerOpen={drawerOpen}
              drawerWidth={drawerWidth}
              setMapButton={setMapButton}
            />
            <Map
              openTab={openTab}
              open={drawerOpen}
              drawerWidth={drawerWidth}
            />
            <div
              style={{ display: openTab === "Save Config" ? "flex" : "none" }}
              openTab={openTab}
              setOpenTab={setOpenTab}
            >
              User Action
            </div>
            <div
              style={{
                display:
                  openTab === "Admin"
                    ? userRole === "admin"
                      ? "flex"
                      : "none"
                    : "none",
              }}
              openTab={openTab}
              setOpenTab={setOpenTab}
            >
              Admin Control
            </div>
          </main>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
        
      )}
    </>
  );
};
export default Screen;
