import React from 'react'

const Modal = ({ children, onClose, onSubmit, title }) => {
  const handleSubmit = () => {
    onSubmit()
    onClose()
  }
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center text-black sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
          &#8203;
        </span>
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full flex-row-reverse'>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex'>
            <button
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm flex'
              onClick={onClose}
            >
              x
            </button>
            <h1 className={'flex text-gray-700 pl-8'}>{title}</h1>
          </div>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-gray-700'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
