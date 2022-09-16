import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//import redux functions and actions
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem';

function Tickets(){

  //useSelector takes reducer name defined in store as argument
  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

  //useDispatch hook is used to call a redux function or action defined in redux
  const dispatch = useDispatch()

  useEffect(() =>{
    return () =>{
      if(isSuccess){

        //call an action
        dispatch(reset())
      }
    }
  },[dispatch, isSuccess])

  useEffect(() =>{

    //call a redux function
    dispatch(getTickets())

  }, [dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
      <>
        <BackButton url={'/'}/>
        <h1>Tickets</h1>
        <div className='tickets'>
          <div className='ticket-headings'>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
          {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </>
  )
}

export default Tickets
