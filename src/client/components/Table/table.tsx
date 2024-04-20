import { Link } from 'react-router-dom'
import Modal from '../Modal/modal'
import { useState } from 'react'

interface Column {
  key: string
  label: string
}

interface Item {
  [key: string]: any
}

interface TableProps {
  actions: ActionItem[]
  columns: Column[]
  handlers: { [ActionItem]: Function }
  items: Item[]
}

type ActionItem = 'view' | 'edit' | 'delete'

const ViewButton = ({ link }) => {
  return (
    <Link to={link} title={'View'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='feather feather-eye'
      >
        <circle cx='12' cy='12' r='3'></circle>
        <path d='M22 12h-4m-2 0a10 10 0 0 0-12 0m14 0a14 14 0 0 0-14 0m14 0a18 18 0 0 0-14 0'></path>
      </svg>
    </Link>
  )
}
const EditButtonWithModal = ({ handler, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = e => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const editForm = handler(data, handleCloseModal)
  return (
    <>
      <Link onClick={handleOpenModal}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          className='feather feather-edit'
        >
          <path d='M20.84 8.479l-3.698-3.698a2.121 2.121 0 0 0-3 0L3.171 16.03a2.118 2.118 0 0 0-.53.944L2 20l4.025-.642 5.386-5.386a2.124 2.124 0 0 0 0-3l-3.697-3.697a2.118 2.118 0 0 1 0-3l3.697-3.697a2.121 2.121 0 0 1 3 0l2.828 2.828a2.118 2.118 0 0 1 0 3.001zM14.849 4.827l-7.07 7.071 2.828 2.828 7.07-7.071-2.828-2.828z'></path>
        </svg>
      </Link>
      {isModalOpen && <Modal onClose={handleCloseModal}>{editForm}</Modal>}
    </>
  )
}

const DeleteButton = ({ onDelete }) => {
  return (
    <button onClick={onDelete} title={'Delete'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='feather feather-trash-2'
      >
        <polyline points='3 6 5 6 21 6'></polyline>
        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
        <line x1='10' y1='11' x2='10' y2='17'></line>
        <line x1='14' y1='11' x2='14' y2='17'></line>
      </svg>
    </button>
  )
}

const Table: React.FC<TableProps> = ({ columns, items, actions, handlers }) => {
  if (actions.length) {
    columns = [...columns, { key: 'action', label: 'Actions' }]
    items = items.map(item => {
      const actionItems = actions.map(action => {
        switch (action) {
          case 'view':
            return <ViewButton link={`/${item.uid}`} />
          case 'edit':
            return <EditButtonWithModal handler={handlers.edit} data={item} />
          case 'delete':
            return <DeleteButton onDelete={() => handlers.delete(item)} />
          default:
            return null
        }
      })
      return {
        ...item,
        action: (
          <div className='action-icons flex'>
            {actionItems.map((item, index) => {
              return (
                <span className={'m-1'} key={index}>
                  {item}
                </span>
              )
            })}
          </div>
        ),
      }
    })
  }
  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1'>
      <div className='max-w-full overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4 font-bold text-lg border-b-4'>
              {columns.map((column, index) => (
                <th key={index} className='min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11'>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'
                  >
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
