import latLngDistance from "./latLngDistance";

const DISTANCE = 50; // in meter
const TIME_DIFFERENCE = 1000 * 60 * 60 * 24 * 2; // 2 Days

const diffCalc = (position, track) => {
  const distance = latLngDistance(
    track.lat,
    track.lng,
    position.lat,
    position.lng,
    "M"
  );
  
  const timeDifference = Math.abs(
    Date.parse(position.time) - Date.parse(track.time)
  );
  return { distance, timeDifference };
};

const calcConnections = ({ positions, tracks }) => {
  return positions.map((position) => {
    const matches = tracks.filter((track) => {
      const diff = diffCalc(position, track);
      if (diff.distance <= DISTANCE && diff.timeDifference <= TIME_DIFFERENCE) {
        return { track, distance: diff.distance };
      } else {
        return null;
      }
    });
    
    matches.sort((a, b) => {
      return Date.parse(a.time) - Date.parse(b.time);
    });
    
    let duration = 0;
    if (matches.length !== 0) {
      duration = Math.abs(
        Date.parse(matches[0].time) -
        Date.parse(matches[matches.length - 1].time)
      );
    }
    return { position, matches, duration };
  });
};

export default function calculateWarnings({ positions, tracks }) {
  return calcConnections({ positions, tracks });
}
