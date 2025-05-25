import React from 'react'
import LOGIN_CARD from '../../assets/images/login-card.png'
const AuthLayout = ({children}) => {
  return <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium '>Bell Expense Tracker</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-[#a3f55c] bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-70 h-70 rounded-4xl border-50 border-emerald-900 absolute -top-20 -left-15'></div>
            <div className='w-80 h-80 rounded-[500px] border-50 border-black absolute top-110 -right-20'></div>

            <div className='relative backdrop-blur-sm bg-white/30 p-4 rounded-lg'>
                <h2 className='text-3xl lg:text-5xl font-semibold text-black px-10'>Smart spending starts here.</h2>
            </div>

            <img
              src={LOGIN_CARD}
              className='w-110 lg-[w:90%] rounded-3xl absolute bottom-20 shadow-lg shadow-black '
            />
        </div>


    </div>
  
}

export default AuthLayout;