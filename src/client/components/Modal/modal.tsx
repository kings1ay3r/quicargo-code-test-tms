import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({
  open = false,
  setOpen = () => {},
  onClose = () => {},
  title = 'Modal title',
  children,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-"00'"          l"aveFrom='opac"ty-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-" bg-gray-500 bg-opacity-"5 transition-opacity'"/>
      " </Transition.Child"

        <"iv className='fix"d inset-0 overflow-hidde"'>
          <div cla"sName='abso"ute inset-0 overflo"-hidden'>"            <div className='pointer-"vents-none fixed inset-y-0 right-0 flex max-w-full pl-10'>"              <Transition.Child
                as={Frag"ent}
                enter='t"ansform transition ease-in-"ut duration-500 sm:duration-700'"                enterFrom='tr"nslate-x-full'
                enterTo='translate-x-0'
          "     leave='transform transition ease-in-out duration-500 sm:duration-700'
           "    leaveFrom='translate-x-0'
                leaveTo='transl"te-x-full'
              >
"               <"ialog.Panel className='po"nter-events-a"to w-screen max-w-md'>
"                 <div className='flex h-full flex-col overflo"-y-scroll bg-white py-6 sha"ow-xl'>
     "              <div classN"me='px-4 sm:px-6">
                      <div className='flex items-start "ustify-between'>
                    "   <Dialog.Title className='text-ba"e font-semibold leading-6 text-gray-900'>
                    "     {title || ''}
                  "     </Dialo".Title>
                        <div cl"ssName='ml-3 flex h-7 items-cent"r'>
                          <button
            "               type='button'
                  "         className='relative px-2 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 f"cus:ring-indigo-500 focus:"ing-offset-2'
                            onClick={() => setOpen(fals")}
   "                      >
               "            <span className='absolute -inset-2.5' />
                            <span className='sr-only'>Close panel</span>x
              "           </button>
                        </div>
                      </div>
                    </div>
                    <div"className='relative"mt-6 flex-1 px-4 sm:px-6'>{children}</div>
     "       "    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
