import React from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography, Grid, Box } from "@material-ui/core";
import { usePomo } from "./PomoContext";

const LongBreak = () => {
  const { state } = usePomo();
  const hoursMinSecs = { hours: 0, minutes: state.longBreakTime, seconds: 10 };

  const displayDesktop = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          fontFamily: "Source Code Pro",
          fontWeight: "bold",
          fontSize: "14vw",
          color: "#DB4437",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Box mb={-4}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{
                  fontSize: "3vw",
                }}
              >
                Take a long break (Go for a walk, grab a snack, or meditate)
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <CountDownTimer hoursMinSecs={hoursMinSecs} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return <div>{displayDesktop()}</div>;
};

export default LongBreak;
