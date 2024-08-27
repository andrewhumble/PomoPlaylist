import React from 'react';
import { Typography, Box } from '@material-ui/core';

const About = () => {
  return (
    <Box sx={{ 
      color: 'white', 
      padding: '20px',
      position: "absolute",
      left: "50%",
      top: "48%",
      transform: "translate(-50%, -50%)",
      p: 4,
      textAlign: "left",
      width: { xs: "90%", sm: "60%", md: "40%" },
    }}>
      <Typography variant="h4" gutterBottom>
        About <span style={{ color: '#1AD760' }}>pomoPlaylist</span>
      </Typography>
      <Typography variant="body1" paragraph>
        The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It involves breaking work into intervals, typically 25 minutes long, separated by short breaks. These intervals are known as “Pomodoros.” The goal is to improve focus and productivity by encouraging short bursts of deep work followed by periods of rest.
      </Typography>
      <Typography variant="body1" paragraph>
        <span style={{ color: '#1AD760' }}>pomoPlaylist</span> enhances the Pomodoro experience by integrating Spotify. During your work sessions, the app automatically plays music to help you stay focused. When it's time for a break, the music pauses, giving you a moment to recharge. The seamless blend of the Pomodoro technique with personalized music helps make your work sessions more enjoyable and effective.
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions, comments, or concerns, feel free to reach out at <a href="mailto:andrew@pomoplaylist.com" style={{ color: '#1AD760' }}>andrew@pomoplaylist.com</a>.
      </Typography>
    </Box>
  );
};

export default About;
