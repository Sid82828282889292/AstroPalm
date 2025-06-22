// app/api/astrology/route.ts

// import { NextResponse } from 'next/server'
// import { getCoordinatesFromLocation } from '@/lib/getCoordinatesFromLocation'

// const API_KEY = 'VbXC8A3gEC2emWq0YTOJ37n7xon4uiOw6brJFCkl'

// export async function POST(req: Request) {
//   try {
//     const { name, date, time, location } = await req.json()
//     const { latitude, longitude } = await getCoordinatesFromLocation(location)

//     const [year, month, day] = date.split('-').map(Number)
//     const [hours, minutes] = time.split(':').map(Number)

//     const commonPayload = {
//       year,
//       month,
//       date: day,
//       hours,
//       minutes,
//       seconds: 0,
//       latitude,
//       longitude,
//       timezone: 5.5,
//     }

//     const indianPayload = {
//       ...commonPayload,
//       config: { observation_point: 'topocentric' },
//       language: 'en'
//     }

//     const headers = {
//       'Content-Type': 'application/json',
//       'x-api-key': API_KEY,
//     }

//     const [svgRes, planetRes, houseRes, aspectRes, wheelRes] = await Promise.all([
//       fetch('https://json.freeastrologyapi.com/horoscope-chart-svg-code', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(indianPayload)
//       }),
//       fetch('https://json.freeastrologyapi.com/planets/extended', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(indianPayload)
//       }),
//       fetch('https://json.freeastrologyapi.com/western/houses', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(commonPayload) // simplified
//       }),
//       fetch('https://json.freeastrologyapi.com/western/aspects', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(commonPayload) // simplified
//       }),
//       fetch('https://json.freeastrologyapi.com/western/natal-wheel-chart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(commonPayload) // simplified
//       })
//     ])

//     console.log('API Statuses:', {
//       chartSvg: svgRes.status,
//       planets: planetRes.status,
//       houses: houseRes.status,
//       aspects: aspectRes.status,
//       wheel: wheelRes.status,
//     })

//     if (![svgRes, planetRes, houseRes, aspectRes, wheelRes].every(res => res.ok)) {
//       throw new Error('One or more astrology API calls failed.')
//     }

//     const [svgJson, planetJson, houseJson, aspectJson, wheelJson] = await Promise.all([
//       svgRes.json(),
//       planetRes.json(),
//       houseRes.json(),
//       aspectRes.json(),
//       wheelRes.json(),
//     ])
//   console.log('Aspects JSON:', JSON.stringify(aspectJson, null, 2))


//     const planetsArray = Object.entries(planetJson.output || {}).map(([planet, data]) => ({
//       planet,
//       ...(typeof data === 'object' && data !== null ? data : {}),
//     }))

//     return NextResponse.json({
//       chartSvg: svgJson.output ?? '',
//       zodiac: 'Natal Chart',
//       avatarUrl: '/zodiac/placeholder.png',
//       planets: planetsArray,
//       houses: houseJson.output?.Houses || [],
//       aspects: aspectJson.output || [],
//       natalWheelUrl: wheelJson.output || '',
//     })
//   } catch (err: any) {
//     console.error('Astrology API route error:', err)
//     return NextResponse.json({ error: 'API call failed. ' + err.message }, { status: 500 })
//   }
// }


// import { NextResponse } from 'next/server'
// import { getCoordinatesFromLocation } from '@/lib/getCoordinatesFromLocation'

// const API_KEY = 'VbXC8A3gEC2emWq0YTOJ37n7xon4uiOw6brJFCkl'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// export async function POST(req: Request) {
//   try {
//     const { name, date, time, location } = await req.json()
//     const { latitude, longitude } = await getCoordinatesFromLocation(location)

//     const [year, month, day] = date.split('-').map(Number)
//     const [hours, minutes] = time.split(':').map(Number)

//     const commonPayload = {
//       year,
//       month,
//       date: day,
//       hours,
//       minutes,
//       seconds: 0,
//       latitude,
//       longitude,
//       timezone: 5.5,
//     }

//     const indianPayload = {
//       ...commonPayload,
//       config: { observation_point: 'topocentric' },
//       language: 'en'
//     }

//     const headers = {
//       'Content-Type': 'application/json',
//       'x-api-key': API_KEY,
//     }

//     // Sequential requests with delay
//     const svgRes = await fetch('https://json.freeastrologyapi.com/horoscope-chart-svg-code', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(indianPayload)
//     })

//     await sleep(1000)

//     const planetRes = await fetch('https://json.freeastrologyapi.com/planets/extended', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(indianPayload)
//     })

//     await sleep(1000)

//     const houseRes = await fetch('https://json.freeastrologyapi.com/western/houses', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(commonPayload)
//     })

//     await sleep(1000)

//     const aspectRes = await fetch('https://json.freeastrologyapi.com/western/aspects', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(commonPayload)
//     })

//     await sleep(1000)

//     const wheelRes = await fetch('https://json.freeastrologyapi.com/western/natal-wheel-chart', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(commonPayload)
//     })

//     console.log('API Statuses:', {
//       chartSvg: svgRes.status,
//       planets: planetRes.status,
//       houses: houseRes.status,
//       aspects: aspectRes.status,
//       wheel: wheelRes.status,
//     })

//     if (![svgRes, planetRes, houseRes, aspectRes, wheelRes].every(res => res.ok)) {
//       throw new Error('One or more astrology API calls failed.')
//     }

//     const [svgJson, planetJson, houseJson, aspectJson, wheelJson] = await Promise.all([
//       svgRes.json(),
//       planetRes.json(),
//       houseRes.json(),
//       aspectRes.json(),
//       wheelRes.json(),
//     ])

//     console.log('Aspects JSON:', JSON.stringify(aspectJson, null, 2))

//     const planetsArray = Object.entries(planetJson.output || {}).map(([planet, data]) => ({
//       planet,
//       ...(typeof data === 'object' && data !== null ? data : {}),
//     }))

//     return NextResponse.json({
//       chartSvg: svgJson.output ?? '',
//       zodiac: 'Natal Chart',
//       avatarUrl: '/zodiac/placeholder.png',
//       planets: planetsArray,
//       houses: houseJson.output?.Houses || [],
//       aspects: aspectJson.output || [],
//       natalWheelUrl: wheelJson.output || '',
//     })

//   } catch (err: any) {
//     console.error('Astrology API route error:', err)
//     return NextResponse.json({ error: 'API call failed. ' + err.message }, { status: 500 })
//   }
// }


import { NextResponse } from 'next/server'
import { getCoordinatesFromLocation } from '@/lib/getCoordinatesFromLocation'

const API_KEY = 'VbXC8A3gEC2emWq0YTOJ37n7xon4uiOw6brJFCkl'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url: string, payload: any, headers: any, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    if (res.status !== 429) return res

    console.warn(`🔁 Retry ${i + 1}/${retries} for ${url} due to 429 Too Many Requests...`)
    await sleep(1500) // exponential backoff can also be used
  }

  throw new Error(`❌ Rate limit exceeded for ${url}`)
}

export async function POST(req: Request) {
  try {
    const { name, date, time, location } = await req.json()
    const { latitude, longitude } = await getCoordinatesFromLocation(location)

    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time.split(':').map(Number)

    const commonPayload = {
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds: 0,
      latitude,
      longitude,
      timezone: 5.5,
    }

    const indianPayload = {
      ...commonPayload,
      config: { observation_point: 'topocentric' },
      language: 'en'
    }

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    }

    // Sequential fetches with delay
    const svgRes = await fetchWithRetry('https://json.freeastrologyapi.com/horoscope-chart-svg-code', indianPayload, headers)
    await sleep(1000)

    const planetRes = await fetchWithRetry('https://json.freeastrologyapi.com/planets/extended', indianPayload, headers)
    await sleep(1000)

    const houseRes = await fetchWithRetry('https://json.freeastrologyapi.com/western/houses', commonPayload, headers)
    await sleep(1000)

    const aspectRes = await fetchWithRetry('https://json.freeastrologyapi.com/western/aspects', commonPayload, headers)
    await sleep(1000)

    const wheelRes = await fetchWithRetry('https://json.freeastrologyapi.com/western/natal-wheel-chart', commonPayload, headers)

    console.log('✅ API Statuses:', {
      chartSvg: svgRes.status,
      planets: planetRes.status,
      houses: houseRes.status,
      aspects: aspectRes.status,
      wheel: wheelRes.status,
    })

    if (![svgRes, planetRes, houseRes, aspectRes, wheelRes].every(res => res.ok)) {
      throw new Error('One or more astrology API calls failed.')
    }

    const [svgJson, planetJson, houseJson, aspectJson, wheelJson] = await Promise.all([
      svgRes.json(),
      planetRes.json(),
      houseRes.json(),
      aspectRes.json(),
      wheelRes.json(),
    ])

    const planetsArray = Object.entries(planetJson.output || {}).map(([planet, data]) => ({
      planet,
      ...(typeof data === 'object' && data !== null ? data : {}),
    }))

    return NextResponse.json({
      chartSvg: svgJson.output ?? '',
      zodiac: 'Natal Chart',
      avatarUrl: '/zodiac/placeholder.png',
      planets: planetsArray,
      houses: houseJson.output?.Houses || [],
      aspects: aspectJson.output || [],
      natalWheelUrl: wheelJson.output || '',
    })

  } catch (err: any) {
    console.error('🚨 Astrology API route error:', err)
    return NextResponse.json({ error: 'API call failed. ' + err.message }, { status: 500 })
  }
}
