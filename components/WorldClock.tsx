"use client";
import { useEffect, useState } from "react";

const cities = [
  { name: "Lucknow", tz: "Asia/Kolkata", flag: "🇮🇳", accent: "#FF6B35" },
  { name: "New York", tz: "America/New_York", flag: "🇺🇸", accent: "#4A90E2" },
  { name: "London", tz: "Europe/London", flag: "🇬🇧", accent: "#E74C3C" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵", accent: "#FF4757" },
  { name: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪", accent: "#F39C12" },
  { name: "Paris", tz: "Europe/Paris", flag: "🇫🇷", accent: "#3498DB" },
  { name: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺", accent: "#2ECC71" },
  { name: "Moscow", tz: "Europe/Moscow", flag: "🇷🇺", accent: "#E84393" },
  { name: "Toronto", tz: "America/Toronto", flag: "🇨🇦", accent: "#E74C3C" },
  { name: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬", accent: "#EE5A6F" },
];

export default function WorldClock() {
  const [times, setTimes] = useState(() => cities.map(() => new Date()));
  const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(cities.map(() => new Date()));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      

      {/* Main Content */}
      <div className=" mx-auto px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city, i) => {
            const local = new Date(
              times[i].toLocaleString("en-US", { timeZone: city.tz })
            );
            const hours = local.getHours() % 12;
            const minutes = local.getMinutes();
            const seconds = local.getSeconds();
            const milliseconds = local.getMilliseconds();

            const hourAngle = (hours * 30 + minutes * 0.5 + seconds * 0.00833) % 360;
            const minuteAngle = (minutes * 6 + seconds * 0.1) % 360;
            const secondAngle = (seconds * 6 + milliseconds * 0.006) % 360;

            const isNight = local.getHours() >= 20 || local.getHours() < 6;

            return (
              <div
                key={city.name}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 cursor-pointer group"
                onClick={() => setSelectedCity(i)}
              >
                {/* City Header */}
                <div className="px-5 pt-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{city.flag}</span>
                      <h3 className="text-lg font-semibold text-slate-900">{city.name}</h3>
                    </div>
                    {isNight && <span className="text-lg">🌙</span>}
                    {!isNight && <span className="text-lg">☀️</span>}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                    {local.toLocaleTimeString([], { 
                      hour: "2-digit", 
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false 
                    })}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {local.toLocaleDateString([], { 
                      weekday: "long",
                      month: "short", 
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>

                {/* Clock Face */}
                <div className="p-6 flex items-center justify-center bg-slate-50">
                  <div className="relative w-36 h-36 rounded-full bg-white shadow-lg flex items-center justify-center" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)' }}>
                    {/* Clock Numbers */}
                    {[12, 3, 6, 9].map((num, idx) => {
                      const angle = num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270;
                      const radius = 52;
                      const x = Math.sin((angle * Math.PI) / 180) * radius;
                      const y = -Math.cos((angle * Math.PI) / 180) * radius;
                      return (
                        <div
                          key={num}
                          className="absolute text-slate-400 text-sm font-bold"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                        >
                          {num}
                        </div>
                      );
                    })}

                    {/* Hour Markers */}
                    {[...Array(60)].map((_, idx) => {
                      const angle = idx * 6;
                      const isHour = idx % 5 === 0;
                      return (
                        <div
                          key={idx}
                          className={`absolute origin-bottom ${isHour ? 'w-0.5 h-3 bg-slate-400' : 'w-px h-1.5 bg-slate-300'}`}
                          style={{
                            transform: `rotate(${angle}deg) translateY(-66px)`,
                          }}
                        />
                      );
                    })}

                    {/* Hour Hand */}
                    <div
                      className="absolute rounded-full origin-bottom"
                      style={{
                        width: "5px",
                        height: "32%",
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${hourAngle}deg)`,
                        left: "50%",
                        backgroundColor: city.accent,
                        boxShadow: `0 2px 6px ${city.accent}40`,
                      }}
                    />

                    {/* Minute Hand */}
                    <div
                      className="absolute rounded-full origin-bottom"
                      style={{
                        width: "3px",
                        height: "44%",
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
                        left: "50%",
                        backgroundColor: "#334155",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    />

                    {/* Second Hand */}
                    <div
                      className="absolute origin-bottom"
                      style={{
                        width: "1.5px",
                        height: "48%",
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${secondAngle}deg)`,
                        left: "50%",
                        backgroundColor: "#EF4444",
                        boxShadow: "0 0 8px rgba(239, 68, 68, 0.4)",
                      }}
                    />

                    {/* Center Bolt */}
                    <div className="absolute w-3 h-3 rounded-full z-10 border-2" style={{ backgroundColor: city.accent, borderColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

                {/* Time Difference */}
                <div className="px-5 pb-4 text-center">
                  <div className="text-xs text-slate-500">
                    {(() => {
                      const localTime = new Date();
                      const diff = (local.getTime() - localTime.getTime()) / (1000 * 60 * 60);
                      const absDiff = Math.abs(diff);
                      const hours = Math.floor(absDiff);
                      const mins = Math.round((absDiff - hours) * 60);
                      if (diff === 0) return "Same as local";
                      return `${diff > 0 ? '+' : '-'}${hours}h ${mins}m`;
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}