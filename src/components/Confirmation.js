import React from "react";
import { Grid, Button, TextField, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

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
    "& MuiInputLabel-root": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "lightgrey",
      },
      "&:hover fieldset": {
        borderColor: "lightgrey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "darkgrey",
      },
    },
  },
  input: {
    height: "7vw",
    width: "14vw",
    fontSize: "4vw",
    textAlign: "center",
  },
});

const Confirmation = ({
  prevStep,
  nextStep,
  values,
  logout,
  play,
  handleChange,
}) => {
  const classes = useStyles();
  const Continue = (e) => {
    e.preventDefault();
    play(values.choiceId);
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Header logout={logout} values={values} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
        align="center"
        className="App"
      >
        <Grid item>
          <Box mb={5}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                fontFamily: "Source Code Pro",
                fontWeight: "bold",
                fontSize: "3vw",
                color: "#ffffff",
              }}
            >
              set your pomodoro schedule
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                fontFamily: "Source Code Pro",
                fontWeight: "bold",
                fontSize: "1.5vw",
                color: "grey",
              }}
            >
              (in minutes)
            </Typography>
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
              <TextField
                variant="outlined"
                label="Work"
                className={classes.root}
                inputProps={{
                  min: 0,
                  style: { textAlign: "center", fontFamily: "Source Code Pro" },
                }}
                InputProps={{
                  className: classes.input,
                }}
                defaultValue="25"
                onChange={handleChange("workTime")}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Short Break"
                className={classes.root}
                inputProps={{
                  min: 0,
                  style: { textAlign: "center", fontFamily: "Source Code Pro" },
                }}
                InputProps={{
                  className: classes.input,
                }}
                defaultValue="5"
                onChange={handleChange("shortBreakTime")}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Long Break"
                className={classes.root}
                inputProps={{
                  min: 0,
                  style: { textAlign: "center", fontFamily: "Source Code Pro" },
                }}
                InputProps={{
                  className: classes.input,
                }}
                defaultValue="10"
                onChange={handleChange("longBreakTime")}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <br />
          <Box mt={3}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={Previous}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#1AD760",
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
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={Continue}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#1AD760",
                    color: "white",
                    padding: "0.6vw 1.7vw",
                    fontSize: "1.3vw",
                    fontFamily: "Source Code Pro",
                    fontWeight: "600",
                  }}
                >
                  start
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={4}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                fontFamily: "Source Code Pro",
                fontSize: "1.2vw",
                color: "grey",
              }}
            >
              a standard Pomodoro cycle is a 25/5/10 minute split for work,
              short break, and long break
            </Typography>
          </Box>
        </Grid>
      </div>
    </Grid>
  );
};

export default Confirmation;
