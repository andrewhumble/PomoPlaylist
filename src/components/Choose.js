import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  ThemeProvider,
} from "@material-ui/core";
import '../App.css'
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "&:before": {
      // normal
      borderBottom: "1px solid green",
    },
    "&:after": {
      // focused
      borderBottom: `1px solid green`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `1px solid white`,
    },
  },
});

const Choose = ({nextStep, prevStep, values, handleChange}) => {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const theme = createTheme({
      typography: {
        fontFamily: "Helvetica",
        allVariants: {
          color: "#191414",
        },
      },
      palette: {
        background: {
          default: "#ffffff",
        },
      },
    });

    const Continue = (e) => {
      e.preventDefault();
      nextStep();
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              transform: "translate(-50%, -50%)",
              padding: "100",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: "30px",
                color: "#darkgrey",
              }}
            >
              CHOOSE A PLAYLIST TO POMOFY
            </Typography>
            <form>
              <Grid container spacing={2} justifyContent="center">
                <Box pt={3} pb={3}>
                  <FormControl style={{ minWidth: 300 }}>
                    <InputLabel
                      id="demo-controlled-open-select-label"
                      style={{
                        color: "#191414",
                      }}
                    >
                      Your Playlist:
                    </InputLabel>
                    <Select
                      labelId="select-playlist"
                      id="select-playlist"
                      name="values.choice"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={values.choice ? values.choice : ""}
                      onChange={handleChange("choice")}
                      className={classes.root}
                    >
                        {values.playlists.map((value, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={value[0]}
                            >
                              {value[0]}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={Continue}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#1DB954",
                      padding: "8px 15px",
                      fontSize: "18px",
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    );
}

export default Choose
