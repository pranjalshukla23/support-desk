import {useEffect, useState} from 'react';
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
//import redux hooks
import {useSelector,useDispatch} from 'react-redux'
//import actions and functions in redux
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner';

function Register(){

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const navigate = useNavigate('')

  //useDispatch is used to select an action or call a function defined in redux
  const dispatch = useDispatch()

  //useSelector is used to get global states defined in redux using slice name
  //useSelector takes reducer name defined in store as argument
  const {user,isLoading,isSuccess,isError,message} = useSelector(state => state.auth)

  const {name,email,password,password2} = formData

  useEffect(() => {

    if(isError){
      toast.error(message)
    }

    //redirect when logged in
    if(isSuccess || user){

      navigate('/')
    }

    //calling an action in redux
    dispatch(reset())

  },[isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) =>{

    e.preventDefault()

    if(password !== password2){
      toast.error('password do not match')
    }else{
      const userData = {
        name,
        email,
        password
      }

      //calling a function defined in redux
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }
  return(
      <>
        <section className="heading">
          <h1>
            <FaUser />
            Register
          </h1>
          <p>Please create an account</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id='name' name='name' value={name} onChange={onChange} placeholder="Enter your name" required/>
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder="Enter your email" required/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder="Enter your password" required/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id='password2' name='password2' value={password2} onChange={onChange} placeholder="Enter your confirmed password" required/>
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

export default Register
