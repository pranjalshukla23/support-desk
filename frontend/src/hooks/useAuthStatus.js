import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

//custom hook
export const useAuthStatus = () =>{

  const [loggedIn,setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  //get state defined in redux
  //useSelector takes reducer name defined in store as argument
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {

    if(user){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
    setCheckingStatus(false)

  },[user])

  return {loggedIn, checkingStatus}
}


