import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Box,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Link,
} from "@material-ui/core";
import logoImg from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/favicon.ico";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  desktopHeader: {
    backgroundColor: "#121212",
    paddingRight: "79px",
    paddingLeft: "100px",
  },
  mobileHeader: {
    backgroundColor: "#121212",
    paddingRight: "79px",
    paddingLeft: "0px",
  },
  logoStyle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "900",
    color: "#FFFFFF",
    fontSize: "20px",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    "&:hover": {
      color: "#1AD760",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  "@media (max-width: 900px)": {
    paddingLeft: 0,
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

const headersData = [
  {
    label: "About Pomodoro",
    href: "/about",
  },
  {
    label: "Support PomoPlaylist",
    href: "/support",
  },
];

const Header = ({ logout }) => {
  const {
    desktopHeader,
    mobileHeader,
    menuButton,
    toolbar,
    drawerContainer,
    logoStyle,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <AppBar className={desktopHeader}>
        <Toolbar className={toolbar}>
          {logo}
          <div>
            <Grid container>
              {getMenuButtons()}
              {getLogoutButtons()}
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <AppBar className={mobileHeader}>
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>
              {getDrawerChoices()}
              {getLogoutButtons()}
            </div>
          </Drawer>

          <div>{logo}</div>
        </Toolbar>
      </AppBar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const onClick = (e) => {
    logout();
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getLogoutButtons = () => {
    return (
      <div>
        <Button
          {...{
            color: "inherit",
            className: menuButton,
          }}
          onClick={onClick}
        >
          Log OUT
        </Button>
      </div>
    );
  };

  const logo = (
    <div>
      <Grid container alignItems="center">
        <Box mt={0}>
          <img src={logoImg} alt="Logo" width="20" height="20" />
        </Box>
        <Box ml={1}>
          <Typography variant="h6" component="h1" className={logoStyle}>
            Pomo
          </Typography>
        </Box>
        <Box ml={0.15}>
          <Typography variant="h6" component="h1">
            Playlist
          </Typography>
        </Box>
      </Grid>
    </div>
  );

  return <header>{mobileView ? displayMobile() : displayDesktop()}</header>;
};

export default Header;
