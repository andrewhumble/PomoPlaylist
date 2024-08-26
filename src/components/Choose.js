import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  Radio
} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { usePomo } from "./PomoContext";

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

const Choose = () => {
  const { state, nextStep, prevStep } = usePomo();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (rows.length > 0) {
      state.choiceId = rows[0].id;
      setSelectedPlaylist(rows[0]); // Preselect the first playlist
    }
  }, []); // Run this effect once when the component mounts

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

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    state.choiceId = playlist.id;
  }

  const columns = [
    {
      field: 'select',
      headerName: '',
      flex: 0.2,
      renderCell: (params) => (
        <Radio
          checked={selectedPlaylist && selectedPlaylist.id === params.row.id}
          onChange={() => selectPlaylist(params.row)}
          value={params.row.id}
        />
      ),
    },
    {
      field: 'imageUrl',
      headerName: 'Image',
      flex: 0.3,
      renderCell: (params) => (
        <img src={params.value} alt="playlist" style={{ width: '50px', height: '50px' }} />
      ),
    },
    { field: 'name', headerName: 'Playlist Name', flex: 1.5 },
    {
      field: 'link',
      headerName: 'Link',
      flex: 0.3,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', display: 'inline-flex', alignItems: 'center' }}>
          <LaunchIcon style={{ fontSize: '18px' }} sx={{ ml: 1 }} />
        </a>
      ),
    },
  ];

  const rows = Object.keys(state.playlistsHash)
    .filter((key) => state.playlistsHash[key].length > 0)
    .map((key, index) => ({
      id: state.playlistsHash[key].id,
      name: key,
      length: state.playlistsHash[key].length,
      imageUrl: state.playlistsHash[key].imageUrl,
      link: state.playlistsHash[key].link,
    }));

  return (
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
            >
              Choose your playlist
            </Typography>
          </Box>
        </Grid>

        <Grid item style={{ height: 400, width: '40vw' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            rowHeight={80}
            pageSize={5}
            columnHeaderHeight={0}
            disableColumnMenu={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            hideFooter={true}
            sx={{
              backgroundColor: "#1e1e1e",
              color: "white",
              fontSize: 16,
              fontFamily: "Source Code Pro",
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1e1e1e',
                color: '#1DB954',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#333',
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
  );
};

export default Choose;
