import * as Location from "expo-location";
import { LOCATION_TRACKING } from "../constants/Tracking";

export const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000 * 20,
    distanceInterval: 20
  });
  
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
  console.log("TRACKING: started -", hasStarted);
  return hasStarted;
};

export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
  console.log("TRACKING: stopped -", true);
  return true;
};
