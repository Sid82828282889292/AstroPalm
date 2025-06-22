// // version-2
// 'use client'
// import StarryBackground from '@/components/StarryBackground'
// import React, { useState } from 'react'
// import { PlanetaryPositions } from '@/components/PlanetaryPositions'

// export default function GetAstrologyPage() {
//   const [form, setForm] = useState({ name: '', date: '', time: '', location: '' })
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState<null | any>(null)
//   const [error, setError] = useState('')

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     try {
//       const res = await fetch('/api/astrology', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || 'Unknown error')
//       setResult(data)
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-10">
//       <h1 className="text-4xl font-bold text-center text-amber-100 mb-10">✨ Get Your Astrology Insights</h1>

//       <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-[#111] border border-amber-200/30 p-6 rounded-xl shadow-xl space-y-4">
//         {['name', 'date', 'time', 'location'].map(field => (
//           <div key={field}>
//             <label className="block capitalize text-sm mb-1">{field}</label>
//             <input
//               required
//               type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
//               name={field}
//               value={form[field as keyof typeof form]}
//               onChange={handleChange}
//               className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
//             />
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition"
//         >
//           {loading ? 'Calculating...' : 'Get Insights'}
//         </button>
//       </form>

//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//       {result && (
//         <div className="mt-16 max-w-5xl mx-auto bg-[#1a1a1a] border border-blue-200/20 rounded-xl p-6 shadow-lg text-white">
//           <h2 className="text-3xl font-bold text-blue-200 mb-4 text-center">🔮 Astrology Reading</h2>
//           <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
//             <img src={result.avatarUrl} alt="Zodiac Avatar" className="w-32 h-32 object-contain" />
//             <div className="w-full max-w-md bg-white rounded-md p-2" dangerouslySetInnerHTML={{ __html: result.chartSvg }} />
//           </div>
//           <PlanetaryPositions planets={result.planets} />
//         </div>
//       )}
//     </div>
//   )
// }


'use client'
import StarryBackground from '@/components/StarryBackground'
import React, { useState } from 'react'
import { PlanetaryPositions } from '@/components/PlanetaryPositions'
import { HousePositions } from '@/components/HousePositions'
import { PlanetaryAspects } from '@/components/PlanetaryAspects'
import { NatalWheelChart } from '@/components/NatalWheelChart'

export default function GetAstrologyPage() {
  const [form, setForm] = useState({ name: '', date: '', time: '', location: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | any>(null)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/astrology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-amber-100 mb-10">✨ Get Your Astrology Insights</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-[#111] border border-amber-200/30 p-6 rounded-xl shadow-xl space-y-4">
        {['name', 'date', 'time', 'location'].map(field => (
          <div key={field}>
            <label className="block capitalize text-sm mb-1">{field}</label>
            <input
              required
              type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition"
        >
          {loading ? 'Calculating...' : 'Get Insights'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {result && (
        <div className="mt-16 max-w-5xl mx-auto bg-[#1a1a1a] border border-blue-200/20 rounded-xl p-6 shadow-lg text-white">
          <h2 className="text-3xl font-bold text-blue-200 mb-4 text-center">🔮 Astrology Reading</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <img src={result.avatarUrl} alt="Zodiac Avatar" className="w-32 h-32 object-contain" />
            <div className="w-full max-w-md bg-white rounded-md p-2" dangerouslySetInnerHTML={{ __html: result.chartSvg }} />
          </div>

          <PlanetaryPositions planets={result.planets} />
          <HousePositions houses={result.houses} />
          <PlanetaryAspects aspects={result.aspects} />
          <NatalWheelChart url={result.natalWheelUrl} />

        </div>
      )}
    </div>
  )
}
