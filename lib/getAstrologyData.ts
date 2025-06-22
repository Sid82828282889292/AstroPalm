import { getCoordinatesFromLocation } from './getCoordinatesFromLocation';

export async function getAstrologyData({ name, date, time, location }: {
  name: string,
  date: string,
  time: string,
  location: string,
}) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  // 👇 Fetch lat/lng dynamically
  const { latitude, longitude } = await getCoordinatesFromLocation(location);
  console.log('📍 Location resolved to:', latitude, longitude);

  const response = await fetch('https://json.freeastrologyapi.com/horoscope-chart-svg-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'VbXC8A3gEC2emWq0YTOJ37n7xon4uiOw6brJFCkl'
    },
    body: JSON.stringify({
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds: 0,
      latitude,
      longitude,
      timezone: 5.5,
      config: { observation_point: 'topocentric' },
      language: 'en'
    })
  });

  const text = await response.text();
  console.log('🧪 RAW API Response:', text);

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  try {
    const json = JSON.parse(text);
    console.log('✅ Parsed JSON:', json);

    return {
      chartSvg: json.output ?? '',
      zodiac: json.output ? 'Natal Chart' : 'Unknown',
      avatarUrl: '/zodiac/placeholder.png'
    };
  } catch (e) {
    throw new Error('❌ Invalid JSON response');
  }
}
