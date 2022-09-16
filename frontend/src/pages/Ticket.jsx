import {useSelector, useDispatch} from 'react-redux'
//import redux functions and actions
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import {getNotes, createNote,reset as notesReset} from '../features/notes/noteSlice'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket(){

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  //get state defined in redux
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

  //get state defined in redux
  //useSelector takes reducer name defined in store as argument
  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  const {ticketId} = useParams()

  const navigate = useNavigate()

  //useDispatch() hook calls redux functions and actions defined in redux
  const dispatch = useDispatch()

  const params = useParams()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    //call redux function
    dispatch(getTicket(ticketId))

    //call redux function
    dispatch(getNotes(ticketId))

  },[isError, message, ticketId])

  const onTicketClosed = () =>{

    //call redux function
    dispatch(closeTicket(ticketId))
    toast.success("Ticket closed")
    navigate('/tickets')
  }

  //open modal
  const openModal = () =>{

    setModalIsOpen(true)

  }

  //close modal
  const closeModal = () =>{
    setModalIsOpen(false);
  }

  //create note submit
  const onNoteSubmit = (e) =>{

    e.preventDefault();

    dispatch(createNote({
      noteText,ticketId
    }))

    closeModal()
  }


  if(isLoading || notesIsLoading){
    return <Spinner />
  }

  if(isError){
    return <h3>Something went wrong</h3>
  }

  return (
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url='/tickets'/>
          <h2>Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span></h2>
          <h3>Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of issue</h3>
            <p>{ticket.description}</p>
            <h2>Notes</h2>
          </div>
        </header>

        {ticket.status !== 'closed' && (
            <button className="btn" onClick={openModal}><FaPlus />Add Note</button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} content='Add Note'>
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>X</button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea name="noteText" id="noteText" className="form-control" placeholder="Note Text" value={noteText} onChange={(e) => setNoteText(e.target.value)}>
              </textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}


        {ticket.status !== 'closed' && (
            <button className="btn btn-block btn-danger" onClick={onTicketClosed}>
              Close Ticket
            </button>
        )}
      </div>
  )
}


export default Ticket
