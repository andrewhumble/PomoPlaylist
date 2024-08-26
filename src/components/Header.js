import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Button,
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
  menuButton: {
    fontFamily: "Source Code Pro, sans-serif",
    fontWeight: 700,
    size: "18px",
    "&:hover": {
      color: "#1AD760",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
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
    label: "Pomodoro Who?",
    href: "/about",
  },
];

const Header = ({ logout }) => {
  const {
    mobileHeader,
    menuButton,
    toolbar,
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
    window.location = "/pomoplaylist";
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {/* Left-aligned TomatoImg */}
        <Box display="flex" alignItems="center">
          {logo}
        </Box>
  
        {/* Right-aligned buttons */}
        <Box display="flex" alignItems="center" marginLeft="auto">
          {getMenuButtons()}
          {getLogoutButtons()}
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
              {getLogoutButtons()}
            </div>
          </Drawer>

          <div className={logoBox}>{logo}</div>
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
      <Button
        {...{
          color: "inherit",
          className: menuButton,
        }}
        onClick={onClick}
      >
        Log OUT
      </Button>
    );
  };

  const logo = (
    <Box onClick={returnHome} className={logoBox}>
      <TomatoImg alt="Logo" width="30" height="30" />
    </Box>
  );

  return <header>{mobileView ? displayMobile() : displayDesktop()}</header>;
};

export default Header;
