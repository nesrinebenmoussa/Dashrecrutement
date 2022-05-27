import { useDispatch } from 'react-redux'
import { deleteRecruter } from '../features/recruter/recruterSlice'

function RecruterItem({ recruter }) {
  const dispatch = useDispatch()

  return (
    <div className='main'>
      <div>{new Date(recruter.createdAt).toLocaleString('en-US')}</div>
      <h2>{recruter.email}</h2>
      <h2>{recruter._id}</h2>
      <button onClick={() => dispatch(deleteRecruter(recruter._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default RecruterItem
