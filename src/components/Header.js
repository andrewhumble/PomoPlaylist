import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Link,
} from "@material-ui/core";
import { ReactComponent as TomatoImg } from '../assets/tomato.svg';
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  mobileHeader: {
    backgroundColor: "#121212",
  },
  logoStyle: {
    fontSize: "20px",
  },
  menuLink: {
    fontFamily: "Source Code Pro, sans-serif",
    fontWeight: 700,
    color: "gray",
    fontSize: "14px",
    margin: "0 10px",
    textDecoration: "none",
    "&:hover": {
      color: "#1AD760",
      textDecoration: "none",
    },
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  logoBox: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginRight: "20px",
    marginLeft: "20px",
  },
}));

const headersData = [
  {
    label: "POMODORO WHO?",
    href: "/about",
  },
];

const Header = () => {
  const {
    mobileHeader,
    menuLink,
    drawerContainer,
    logoBox,
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

  const returnHome = () => {
    window.location = "/";
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        {/* Left-aligned TomatoImg */}
        <Box display="flex" alignItems="center">
          {logo}
        </Box>

        {/* Right-aligned links */}
        <Box display="flex" alignItems="center" marginLeft="auto">
          {getMenuLinks()}
          {getLogoutLink()}
        </Box>
      </Toolbar>
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
              {getLogoutLink()}
            </div>
          </Drawer>

          <div className={logoBox}>{logo}</div>
        </Toolbar>
      </AppBar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => (
      <Link
        {...{
          component: RouterLink,
          to: href,
          className: menuLink,
          key: label,
        }}
      >
        <MenuItem>{label}</MenuItem>
      </Link>
    ));
  };

  const onClick = (e) => {
    returnHome();
  };

  const getMenuLinks = () => {
    return headersData.map(({ label, href }) => (
      <Link
        {...{
          key: label,
          to: href,
          component: RouterLink,
          className: menuLink,
        }}
      >
        {label}
      </Link>
    ));
  };

  const getLogoutLink = () => (
    <Link
      {...{
        className: menuLink,
        component: "button",
        onClick: onClick,
      }}
    >
      LOGOUT
    </Link>
  );

  const logo = (
    <Box onClick={returnHome} className={logoBox}>
      <TomatoImg alt="Logo" width="30" height="30" />
    </Box>
  );

  return <header>{mobileView ? displayMobile() : displayDesktop()}</header>;
};

export default Header;
