//lib/getCoordinatesFromLocation.ts
export async function getCoordinatesFromLocation(location: string): Promise<{ latitude: number, longitude: number }> {
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
  const geoData = await geoRes.json();

  if (!geoData || geoData.length === 0) {
    throw new Error('Location not found');
  }

  const { lat, lon } = geoData[0];
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon)
  };
}
