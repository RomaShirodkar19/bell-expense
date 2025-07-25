import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({title, icon, date, amount, type, hideDeleteBtn, onDelete}) => {
    const getAmountStyles = () =>
        type === "income" ? "border border-green-500 bg-green-900/20 text-green-500": "border border-red-500 bg-red-900/20 text-red-500";





  return (
    <div className=" group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-[#2c2e2a]">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-black bg-gray-100 rounded-full">
            {icon ? (
                <img
                 src={icon}
                 alt={title}
                 className="w-6 h-6"
                 />
            ) : (
                <LuUtensils/>
            )}
        </div>

        <div className="flex-1 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs mt-1 text-gray-500">{date}</p>
            </div>

            <div className='flex items-center gap-2'>
                {!hideDeleteBtn && (
                    <button
                    className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                    onClick={onDelete}
                    >

                        <LuTrash2 size={18} />

                    </button>
                )}

                <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                >
                    <h6 className='text-xs font-medium'>
                        {type === "income" ? "+" : "-"} ${amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
                </div>


            </div>


        </div>


    </div>
  )
}

export default TransactionInfoCard