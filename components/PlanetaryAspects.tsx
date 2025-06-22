// // components/PlanetaryAspects.tsx
// import React from 'react'

// export const PlanetaryAspects = ({ aspects }: { aspects: any[] }) => {
//   if (!Array.isArray(aspects)) {
//     console.warn('PlanetaryAspects: aspects is not an array', aspects)
//     return null
//   }

//   return (
//     <div className="mt-10">
//       <h3 className="text-xl font-semibold text-purple-400">🔗 Planetary Aspects</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {aspects.map((aspect, index) => (
//           <div key={index} className="bg-[#1e1e1e] p-4 rounded-xl shadow border border-purple-800/20">
//             <h4 className="text-lg font-medium text-purple-200">
//               {aspect.planet_1.en} ☍ {aspect.planet_2.en}
//             </h4>
//             <p className="text-sm text-gray-300">
//               Aspect: {aspect.aspect_name?.en || '—'}<br />
//               Orb: {aspect.orb?.toFixed(2) ?? '—'}°
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// components/PlanetaryAspects.tsx
// components/PlanetaryAspects.tsx
import React from 'react'

export const PlanetaryAspects = ({ aspects }: { aspects: any[] }) => {
  if (!Array.isArray(aspects)) {
    console.warn('PlanetaryAspects: aspects is not an array', aspects)
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-purple-400">✨ Planetary Aspects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {aspects.map((a, i) => (
          <div
            key={i}
            className="bg-[#111] border border-purple-900/40 rounded-xl p-4 shadow"
          >
            <h4 className="text-lg font-medium text-purple-200">
              {a.planet_1?.en || a.planet_1 || '—'} ☍ {a.planet_2?.en || a.planet_2 || '—'}
            </h4>
            <p className="text-sm text-gray-300">
              Aspect: {a.aspect_type?.en || '—'}<br />
              Orb: {typeof a.orb === 'number' ? `${a.orb.toFixed(1)}°` : '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
