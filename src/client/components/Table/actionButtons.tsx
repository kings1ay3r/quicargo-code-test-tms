import useAccessor from '../../customHooks/useAccessor'
import { DeleteButton, EditButtonWithModal } from './table'
import React from 'react'

const ActionButtons = ({ item, handlers }) => {
  const { accessor } = useAccessor()

  const actions = ['edit', ...(accessor.claims.includes('trucks.all') ? ['delete'] : [])]
  const actionItems = actions.map(action => {
    switch (action) {
      case 'edit':
        return <EditButtonWithModal handler={handlers.edit} data={item} />
      case 'delete':
        return <DeleteButton onDelete={() => handlers.delete(item)} />
      default:
        return null
    }
  })
  return (
    <div className='action-icons flex'>
      {actionItems.map((item, index) => {
        return (
          <span className={'m-1'} key={index}>
            {item}
          </span>
        )
      })}
    </div>
  )
}
export default ActionButtons
