import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-[#1b1c1a] border-b border-primary backdrop-blur-[2px] shadow-lg shadow-green-800 py-4 px-7 sticky top-0 z-30">
        <button
        className="block lg:hidden text-white"
        onClick={()=>{
            setOpenSideMenu(!openSideMenu);
        }}
        >
         {openSideMenu? (
            <HiOutlineX className="text-2xl text-white"/>
         ) : (
            <HiOutlineMenu className="text-2xl text-white"/>
         )}
        </button>

        <h2 className="text-xl font-medium"><span className='text-primary'>Bell</span> Expense Tracker</h2>

        {openSideMenu && (
            <div className="fixed top-[61px] -ml-4">
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}
        
    </div>
  )
}

export default Navbar