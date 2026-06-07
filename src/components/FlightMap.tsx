'use client';

import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const DELHI = { name: 'Delhi, India', coords: [77.209, 28.6139] as [number, number] };
const SF = { name: 'San Francisco', coords: [-122.4194, 37.7749] as [number, number] };
const ARC_MID = [(-122.4194 + 77.209) / 2 - 20, 65] as [number, number];

export default function FlightMap() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0a0f1e] border border-slate-700 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e]/60 pointer-events-none z-10" />
      <div className="absolute top-3 left-4 z-20 text-xs text-slate-400 font-medium tracking-widest uppercase">
        Delhi → San Francisco
      </div>

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160, center: [-20, 35] }}
        width={600}
        height={300}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: '#1e293b' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Flight arc */}
        <Line
          from={DELHI.coords}
          to={SF.coords}
          coordinates={[DELHI.coords, ARC_MID, SF.coords]}
          stroke="#f59e0b"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          strokeOpacity={0.8}
        />

        {/* Plane midpoint */}
        <Marker coordinates={ARC_MID}>
          <text textAnchor="middle" fontSize={14} style={{ userSelect: 'none' }}>✈</text>
        </Marker>

        {/* Delhi */}
        <Marker coordinates={DELHI.coords}>
          <circle r={5} fill="#f59e0b" opacity={0.9} />
          <circle r={10} fill="#f59e0b" opacity={0.2} />
          <text y={-12} textAnchor="middle" fontSize={9} fill="#fbbf24" fontWeight="bold">Delhi</text>
        </Marker>

        {/* San Francisco */}
        <Marker coordinates={SF.coords}>
          <circle r={5} fill="#34d399" opacity={0.9} />
          <circle r={10} fill="#34d399" opacity={0.2} />
          <text y={-12} textAnchor="middle" fontSize={9} fill="#6ee7b7" fontWeight="bold">San Francisco</text>
        </Marker>
      </ComposableMap>
    </div>
  );
}
