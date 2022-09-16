import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
//import redux hooks
import {useSelector, useDispatch} from 'react-redux'
//import redux actions and functions
import {logout, reset} from '../features/auth/authSlice'
import {toast} from 'react-toastify';
function Header(){

  const navigate = useNavigate()

  //useDispatch is used to call an action or function defined in redux
  const dispatch = useDispatch()

  //useSelector is used to get global states defined in redux using slice name
  //useSelector takes reducer name defined in store as argument
  const {user} = useSelector((state) => state.auth)

  console.log(user)

  const onLogout = () =>{

    //calling a function in redux
    dispatch(logout())
    //calling an action in redux
    dispatch(reset())
    toast.success("user logged out successfully")
    navigate('/')
  }
  return (
      <header className="header">
        <div className="logo">
          <Link to='/'>Support Desk</Link>
        </div>
        <ul>
          {user ? (
              <li>
                <button className="btn"
                onClick={onLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
          ) : (
              <>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <FaUser />
                    Register
                  </Link>
                </li>
              </>

          )}

        </ul>

      </header>
  )
}

export default Header
