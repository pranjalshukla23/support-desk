import {useEffect, useState} from 'react';
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login(){

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  //useDispatch is used to select an action or function defined in redux
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //get global states defined in redux
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

    const userData = {
      email,
      password,
    }

    //call a function defined in redux
    dispatch(login(userData))

  }

  if(isLoading){
    return <Spinner />
  }
  return(
      <>
        <section className="heading">
          <h1>
            <FaSignInAlt />
            Login
          </h1>
          <p>Please login to get support</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder="Enter your email" required/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder="Enter your password" required/>
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

export default Login
