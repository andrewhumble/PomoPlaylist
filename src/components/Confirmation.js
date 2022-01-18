import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1DB954",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1DB954",
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
    height: 75,
    width: 150,
    fontSize: "50px",
    textAlign: "center",
  },
});

const Confirmation = ({ prevStep, nextStep, values, play, handleChange }) => {
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
    <Container component="main">
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
        align="center"
        className="App"
      >
        <Box mb={4}>
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
            set pomodoro schedule in minutes
          </Typography>
        </Box>
        <Grid container direction={"row"} spacing={2} justifyContent="center">
          <Grid item>
            <TextField
              variant="outlined"
              label="Work"
              className={classes.root}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
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
              inputProps={{ min: 0, style: { textAlign: "center" } }}
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
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              InputProps={{
                className: classes.input,
              }}
              defaultValue="10"
              onChange={handleChange("longBreakTime")}
            ></TextField>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              onClick={Previous}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#1DB954",
                padding: "8px 100px",
                fontSize: "18px",
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
                backgroundColor: "#1DB954",
                padding: "8px 100px",
                fontSize: "18px",
              }}
            >
              start
            </Button>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{
              fontFamily: "Helvetica",
              fontSize: "15px",
              color: "grey",
            }}
          >
            a standard Pomodoro cycle is a 25/5/10 minute split for work, short
            break, and long break
          </Typography>
        </Box>
      </div>
    </Container>
  );
};

export default Confirmation;
