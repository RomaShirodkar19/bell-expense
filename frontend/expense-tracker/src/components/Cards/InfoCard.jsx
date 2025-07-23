import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return <div className="flex gap-6 p-6 rounded-2xl border border-gray-200/50">
    <div className={`w-14 h-14 flex items-center justify-center text-[20px] text-white ${color} rounded-full drop-shadow-xl`}>
      {icon}
    </div>
    <div>
      <h6 className='text-sm mb-1'>{label}</h6>
      <span className='text-2xl font-medium'>${value}</span>
    </div>
  </div>
}

export default InfoCard