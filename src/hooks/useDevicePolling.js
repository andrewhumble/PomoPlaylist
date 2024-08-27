import { useEffect } from "react";
import SpotifyService from "../services/spotifyService";

/**
 * Custom hook for polling Spotify devices.
 * @param {Function} setActiveDevice - Function to update the active device in the parent component.
 * @param {Function} setIsLoading - Function to toggle the loading state in the parent component.
 * @param {number} pollingIntervalMs - The polling interval in milliseconds (default is 3000ms).
 */
const useDevicePolling = (setActiveDevice, setIsLoading, pollingIntervalMs = 3000) => {
  useEffect(() => {
    let pollingInterval;

    const fetchDevices = async () => {
      try {
        const devices = await SpotifyService.getActiveDevices();
        if (devices && devices.length > 0) {
          setActiveDevice(devices[0]); // Assuming the first device is the desired one
          setIsLoading(false); // Stop loading when a device is found
          clearInterval(pollingInterval); // Stop polling once a device is found
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    // Start polling if loading is true
    if (setIsLoading) {
      pollingInterval = setInterval(fetchDevices, pollingIntervalMs);
    }

    // Clean up the interval when the component using this hook is unmounted
    return () => clearInterval(pollingInterval);
  }, [setActiveDevice, setIsLoading, pollingIntervalMs]);
};

export default useDevicePolling;
