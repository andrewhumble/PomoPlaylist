import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import logoImg from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/favicon.ico";
import { Helmet } from "react-helmet";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#000000",
    paddingRight: "79px",
    paddingLeft: "118px",
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
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
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

const Header = ({ logout, values }) => {
  const { header, logoStyle, menuButton } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar>
        {logo}
        <div>
          <Grid container alignItems="flex-end">
            <Grid>
              <Box ml={55}>{getMenuButtons()}</Box>
            </Grid>
            <Grid>
              <Box>{getLogoutButtons()}</Box>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    );
  };

  const navigate = useNavigate();

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

    // <div>
    //   <Grid container>
    //     <Box mt={1}>
    //       <img src={logoImg} alt="Logo" width="20" height="20" />
    //     </Box>
    //     <Box ml={1} mt={0.5}>
    //       <Typography variant="h6" component="h1" className={logoStyle}>
    //         Pomo
    //       </Typography>
    //     </Box>
    //     <Box mt={0.5} ml={0.15}>
    //       <Typography variant="h6" component="h1">
    //         Playlist
    //       </Typography>
    //     </Box>
    //     <Grid item xs>
    //       <Grid container direction="row-reverse">
    //         <Grid item>
    //           <Box ml={145} mt={0.65}>
    //             <Button
    //               onClick={onClick}
    //               type="submit"
    //               variant="contained"
    //               style={{
    //                 padding: "4px 10px",
    //                 fontSize: "12px",
    //                 backgroundColor: "#1DB954",
    //                 fontFamily: "Montserrat, sans-serif",
    //                 fontWeight: "600",
    //               }}
    //             >
    //               logout
    //             </Button>
    //           </Box>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </div>
  );

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
};

export default Header;
