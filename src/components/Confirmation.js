import React from "react";
import { Grid, Button, TextField, Typography, Box, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePomo } from "./PomoContext";
import SpotifyService from '../services/spotifyService';

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1AD760",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1AD760",
    },
    "& .MuiInputBase-input": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "darkgrey",
      },
    },
    "& .MuiFormLabel-root": {
      color: "lightgrey",
    },
  },
  input: {
    textAlign: "center",
    fontFamily: "Source Code Pro",
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "100px",
  },
  button: {
    backgroundColor: "#1AD760",
    color: "white",
    fontFamily: "Source Code Pro",
    fontWeight: "600",
  },
});

const Confirmation = () => {
  const { state, nextStep, prevStep, dispatch } = usePomo();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:700px)");

  const Continue = (e) => {
    e.preventDefault();
    SpotifyService.play(state, dispatch);
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", field, payload: e.target.value });
  };

  const renderTextField = (label, defaultValue, onChange, customInputProps = {}) => (
    <TextField
      variant="outlined"
      label={label}
      className={classes.root}
      inputProps={{ ...customInputProps, className: classes.input }}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );

  const renderFormFields = () => (
    <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
      <Grid item>{renderTextField("Short Break", "5", handleChange("shortBreakTime"))}</Grid>
      <Grid item>{renderTextField("Long Break", "10", handleChange("longBreakTime"))}</Grid>
      <Grid item>{renderTextField("Work", "25", handleChange("workTime"))}</Grid>
    </Grid>
  );

  const renderActionButtons = () => (
    <Box mt={isMobile ? 2 : 6}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Button
            onClick={Previous}
            fullWidth
            variant="contained"
            className={classes.button}
            size="large"
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={Continue}
            fullWidth
            variant="contained"
            className={classes.button}
            size="large"
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderTypography = (align, text, fontSize, color) => (
    <Typography
      component="h1"
      variant={fontSize}
      align={align}
      style={{
        fontFamily: "Source Code Pro",
        fontWeight: "bold",
        color,
      }}
    >
      {text}
    </Typography>
  );

  return (
    <div className={classes.container} align="center">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item>
          <Box mt={isMobile ? 8 : 0} mb={5}>
            {renderTypography("center", "set your pomodoro schedule", isMobile ? "h4" : "h4", "#ffffff")}
            {renderTypography("right", "(in mins)", isMobile ? "h6" : "h6", "grey")}
          </Box>
        </Grid>
        <Grid item>{renderFormFields()}</Grid>
        <Grid item>{renderActionButtons()}</Grid>
        <Grid item>
          <Box mt={4}>
            {renderTypography(
              "center",
              "a standard Pomodoro cycle is a 25/5/10 minute split for work, short break, and long break",
              isMobile ? "h6" : "h6",
              "grey"
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Confirmation;
