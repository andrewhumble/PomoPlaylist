import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1AD760",
      fontSize: "2vw",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1AD760",
    },
    "& .MuiInputBase-input": {
      color: "#ffffff",
    },
    "& MuiInputLabel-root": {
      color: "#ffffff",
      fontSize: "1.5vw",
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
      fontSize: "1.4vw",
    },
  },
  input: {
    height: "8vw",
    width: "12vw",
    fontSize: "5vw",
    textAlign: "center",
  },
  rootMobile: {
    "& label.Mui-focused": {
      color: "#1AD760",
      fontSize: "4vw",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1AD760",
    },
    "& .MuiInputBase-input": {
      color: "#ffffff",
    },
    "& MuiInputLabel-root": {
      color: "#ffffff",
      fontSize: "3.5vw",
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
      fontSize: "3.5vw",
    },
  },
  inputMobile: {
    height: "18vw",
    width: "22vw",
    fontSize: "8vw",
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

  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const Continue = (e) => {
    e.preventDefault();
    play(values.choiceId);
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const displayDesktop = () => {
    return (
      <div>
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
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
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
                    fontSize: "5vh",
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
                    fontSize: "2vh",
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
                spacing={4}
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
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
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
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
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
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
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
                        padding: "0.6vw 8vw",
                        fontSize: "1.5vw",
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
                        padding: "0.6vw 8vw",
                        fontSize: "1.5vw",
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
                    fontSize: "2.4vh",
                    color: "grey",
                  }}
                >
                  a standard Pomodoro cycle is a 25/5/10 minute split for work,
                  short break, and long break
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const displayMobile = () => {
    return (
      <div>
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
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Box mt={8} mb={5}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  style={{
                    fontFamily: "Source Code Pro",
                    fontWeight: "bold",
                    fontSize: "5vh",
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
                    fontSize: "2vh",
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
                    className={classes.rootMobile}
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
                    }}
                    InputProps={{
                      className: classes.inputMobile,
                    }}
                    defaultValue="25"
                    onChange={handleChange("workTime")}
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Short Break"
                    className={classes.rootMobile}
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
                    }}
                    InputProps={{
                      className: classes.inputMobile,
                    }}
                    defaultValue="5"
                    onChange={handleChange("shortBreakTime")}
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Long Break"
                    className={classes.rootMobile}
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontFamily: "Source Code Pro",
                      },
                    }}
                    InputProps={{
                      className: classes.inputMobile,
                    }}
                    defaultValue="10"
                    onChange={handleChange("longBreakTime")}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <br />
              <Box mt={2}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <Grid item xs={6} sm={6}>
                    <Button
                      onClick={Previous}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#1AD760",
                        color: "white",
                        padding: "3vw 12vw",
                        fontSize: "5vw",
                        fontFamily: "Source Code Pro",
                        fontWeight: "600",
                      }}
                    >
                      back
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Button
                      onClick={Continue}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#1AD760",
                        color: "white",
                        padding: "3vw 12vw",
                        fontSize: "5vw",
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
                    fontSize: "1.5vh",
                    color: "grey",
                  }}
                >
                  a standard Pomodoro cycle is a 25/5/10 minute split for work,
                  short break, and long break
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return <div>{mobileView ? displayMobile() : displayDesktop()}</div>;
};

export default Confirmation;
