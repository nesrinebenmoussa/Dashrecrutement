import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function RecruterItem({ recruter }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(recruter.createdAt).toLocaleString('en-US')}</div>
      <h2>{recruter.name}</h2>
      <button onClick={() => dispatch(deleteGoal(recruter._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default RecruterItem
