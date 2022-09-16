import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
//import redux functions and actions
import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
function NewTicket(){

  //get state defined in redux
  //useSelector takes reducer name defined in store as argument
  const {user} = useSelector((state) => state.auth)

  //get state defined in redux
  //useSelector takes reducer name defined in store as argument
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket)

  //useDispatch is used to call redux function or an action
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product,setProduct] = useState('iPhone')
  const [description,setDescription] = useState('')

  useEffect(() => {

    if(isError){
      toast.error(message)
    }

    if(isSuccess){

      //call redux action
      dispatch(reset())

      navigate('/tickets')
    }

    //call redux action
    dispatch(reset())

  },[dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) =>{
    e.preventDefault()

    console.log("product and description",product,description)

    //call redux function
    dispatch(createTicket({
      product,
      description
    }))
  }

  if(isLoading){
    return <Spinner />
  }

  return(
      <>
        <BackButton url='/'/>
        <section className="heading">
          <h1>Create New Ticket</h1>
          <p>Please fill out the form below</p>
        </section>
        <section className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input type="text" className="form-control" value={email} disabled/>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select name="product" id="product" value={product} onChange={(e) =>{
                console.log(e.target.value)
                setProduct(e.target.value)
              }}>
                <option value="iPhone">iPhone</option>
                <option value="Macbook Pro">Macbook Pro</option>
                <option value="iMac">iMac</option>
                <option value="iPad">iPad</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of the issue</label>
              <textarea name="description" id="description" className="form-control" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </>
  )
}

export default NewTicket
