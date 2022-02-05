import React from "react";
import {
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@material-ui/core";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles({
  root: {
    "&:before": {
      // normal
      borderBottom: "0.1vw solid green",
    },
    "&:after": {
      // focused
      borderBottom: `0.1vw solid green`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `0.1vw solid white`,
    },
  },
  stepStyle: {
    color: "#1dd760",
  },
});

const Choose = ({ nextStep, prevStep, logout, values, handleChange }) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const Continue = (e) => {
    if (values.choice !== "") {
      e.preventDefault();
      nextStep();
    }
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        className="choose"
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Box mb={3}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                style={{
                  fontFamily: "Source Code Pro",
                  fontWeight: "bold",
                  fontSize: "3vw",
                  color: "white",
                }}
              >
                choose a playlist
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box mb={5} align="center">
              <form>
                <FormControl style={{ minWidth: "30vw" }}>
                  <InputLabel
                    id="demo-controlled-open-select-label"
                    style={{
                      color: "white",
                      fontFamily: "Source Code Pro",
                    }}
                  >
                    your playlist:
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
                          sx={{
                            "& .MuiButtonBase-root": {
                              color: "black",
                            },
                          }}
                        >
                          {value[0]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </form>
            </Box>
          </Grid>
          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid item>
                <Button
                  onClick={Previous}
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#1DB954",
                    color: "white",
                    padding: "0.6vw 1.7vw",
                    fontSize: "1.3vw",
                    fontFamily: "Source Code Pro",
                    fontWeight: "600",
                  }}
                >
                  back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={Continue}
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#1DB954",
                    color: "white",
                    padding: "0.6vw 1.7vw",
                    fontSize: "1.3vw",
                    fontFamily: "Source Code Pro",
                    fontWeight: "600",
                  }}
                >
                  next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Choose;
