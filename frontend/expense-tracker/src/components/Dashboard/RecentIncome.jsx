import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className="text-base"/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                 title={item.source}
                 key={item._id}
                 amount={item.amount}
                 date={moment(item.date).format("Do MMM YYYY")}
                 icon={item.icon}
                 type="income"
                 hideDeleteBtn
                />
            ))}
        </div>


    </div>
  )
}

export default RecentIncome