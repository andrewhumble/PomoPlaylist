import React, { useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import LaunchIcon from '@mui/icons-material/Launch';
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const useStyles = makeStyles({
  root: {
    "&:before": {
      // normal
      borderBottom: "0.2vh solid green",
    },
    "&:after": {
      // focused
      borderBottom: `0.2vh solid green`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `0.2vh solid white`,
    },
    "&": {
      color: "white",
      fontFamily: "Source Code Pro",
    },
  },
  stepStyle: {
    color: "#1dd760",
  },
});

const showNotification = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

const Choose = ({ nextStep, prevStep, logout, values }) => {
  const classes = useStyles();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // State to track selected playlist

  const Continue = (e) => {
    e.preventDefault();
    if (!selectedPlaylist) {
      showNotification("Hold on there!", "Please select a playlist before proceeding.", "danger");
      return;
    }
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  // Prepare the columns and rows for the DataGrid
  const columns = [
    {
      field: 'imageUrl',
      headerName: 'Image',
      flex: 0,
      renderCell: (params) => (
        <img src={params.value} alt="playlist" style={{ width: '50px', height: '50px' }} />
      ),
    },
    { field: 'name', headerName: 'Playlist Name', flex: 1 },
    { field: 'length', headerName: 'Length', flex: 1,
      renderCell: (params) => (
        <p>{params.value} songs</p>
      ),
     },
    {
      field: 'link',
      headerName: 'Link',
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', display: 'inline-flex', alignItems: 'center' }}>
          Open in Spotify <LaunchIcon style={{ fontSize: '16px' }} sx={{ ml: 1 }} />
        </a>
      ),
    },
  ];

  const rows = Object.keys(values.playlistsHash).map((key, index) => ({
    id: values.playlistsHash[key].id, // unique row ID
    name: key, // playlist name
    length: values.playlistsHash[key].length,
    imageUrl: values.playlistsHash[key].imageUrl,
    link: values.playlistsHash[key].link,
  }));

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
          alignItems="left"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item>
            <Box mb={3}>
              <Typography
                component="h1"
                variant="h4"
                align="left"
                style={{
                  fontFamily: "Source Code Pro",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Choose your playlist
              </Typography>
            </Box>
          </Grid>

          <Grid item style={{ height: 400, width: '60vw' }}>
            <DataGrid
              columns={columns}
              rows={rows}
              rowHeight={100}
              pageSize={5}
              columnHeaderHeight={0}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                if (newSelection.length > 0) {
                  const selectedId = newSelection[0]; // assuming only one playlist can be selected
                  setSelectedPlaylist(rows.find(row => row.id === selectedId));
                } else {
                  setSelectedPlaylist(null);
                }
              }}
              disableColumnMenu={true}
              disableColumnSelector={true}
              disableDensitySelector={true}
              disableMultipleRowSelection={true}
              hideFooter={true}
              sx={{
                backgroundColor: "#1e1e1e",
                color: "white",
                fontFamily: "Source Code Pro",
                "& .MuiDataGrid-columnHeaders": {
                  color: "black", // Header text color
                  fontSize: 14,
                },
              }}
            />
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={2}
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{ marginTop: 20 }}
            >
              <Grid item>
                <Button
                  onClick={Previous}
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "#1DB954",
                    color: "white",
                    fontFamily: "Source Code Pro",
                    fontWeight: "600",
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={Continue}
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "#1DB954",
                    color: "white",
                    fontFamily: "Source Code Pro",
                    fontWeight: "600",
                  }}
                >
                  Next
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
