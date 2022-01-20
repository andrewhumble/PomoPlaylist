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

  const Logout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      className="choose"
      style={{
        position: "absolute",
        left: "50%",
        top: "42%",
        transform: "translate(-50%, -50%)",
        padding: "100",
      }}
    >
      <Box mb={3}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          style={{
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#191414",
          }}
        >
          choose a playlist
        </Typography>
      </Box>
      <Box mb={4}>
        <form>
          <FormControl style={{ minWidth: 300 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              style={{
                color: "#191414",
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
                  <MenuItem key={index} value={value[0]}>
                    {value[0]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
      </Box>
      <Grid container direction={"row"} spacing={2} justifyContent="center">
        <Grid item>
          <Button
            onClick={Previous}
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
            back
          </Button>
        </Grid>
        <Grid item>
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
            next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Choose;
