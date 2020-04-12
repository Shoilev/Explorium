export const checkHaversineDistance = (coords1, coords2, distance = false, compareDirection = false) => {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const lon1 = coords1.longitude;
  const lat1 = coords1.latitude;

  const lon2 = coords2.longitude;
  const lat2 = coords2.latitude;

  const R = 6371; // km

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  if(compareDirection) {
    return d;
  }

  let finalDistance = distance > 0 ? distance/1000 : 0.05;

  return d < finalDistance; // 50 meters is default
  // return d < 10000;
}

export const checkBounds = (landmarkBounds, userLocation) => {
  var eastBound = userLocation.longitude < landmarkBounds.northeast.lng;
  var westBound = userLocation.longitude > landmarkBounds.southwest.lng;
  var inLong;

  if (landmarkBounds.northeast.lng < landmarkBounds.southwest.lng) {
      inLong = eastBound || westBound;
  } else {
      inLong = eastBound && westBound;
  }

  var inLat = userLocation.latitude > landmarkBounds.southwest.lat && userLocation.latitude < landmarkBounds.northeast.lat;

  return inLat && inLong;
}
