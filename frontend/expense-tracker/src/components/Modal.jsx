import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {

    if(!isOpen) return null

  return <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-gray-600/20 bg-opacity-50'>
         <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* Modal Content */}
            <div className='realtive bg-[#1b1c1a] rounded-lg shadow-sm'>
                {/* Modal header */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
                    <h3 className='text-lg font-medium'>
                        {title}
                    </h3>

                    <button
                     type="button"
                     className="card-btn"
                     onClick={onClose}
                    >
                    X
                    </button>
                </div>

                {/* Modal body */}
                <div className='p-4 md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
         </div>
  </div>
}

export default Modal