import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
   <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">World Clock</h1>
              <p className="text-sm text-slate-500 mt-1">Real-time across global cities</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Local Time</div>
              <div className="text-xl font-semibold text-slate-900">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar