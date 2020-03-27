/**
 * Calculate distance between two locations (latitude, longitude)
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @param {string} unit distance unit (K = 'km' | M = 'meter')
 *
 * @returns {number}
 */
export default function latLngDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  }
  
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const radtheta = (Math.PI * (lon1 - lon2)) / 180;
  
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(Math.min(dist, 1));
  dist = ((dist * 180) / Math.PI) * 60 * 1.1515;
  
  switch (unit) {
  case "K": {
    dist *= 1.609344;
    break;
  }
  case "M": {
    dist *= 1.609344 * 1000;
    break;
  }
  }
  
  return dist;
}
