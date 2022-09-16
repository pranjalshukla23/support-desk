import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';



//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

//define initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to register a new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>{

  try{

    //calling a service
    return await authService.register(user)

  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message)
    || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to login a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) =>{

  try{

    //calling a service
    return await authService.login(user)

  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//logout user
export const logout = createAsyncThunk('auth/logout', async() =>{

  await authService.logout()
})

//defining a slice
//function where initial state and reducers are defined
export const authSlice = createSlice({

  //set slice name
  name: 'auth',

  //initial state
  initialState,

  //reducers
  //reducers get executed based on action type
  //reducers update the state based on action type
  reducers: {

    //redux action
    //reset action and what will happen if this action is called
    reset: (state) =>{

      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }

  },

  //extra reducers
  //extra reducers are called by createAsyncThunk automatically
  //these reducers get executed based on the status of redux functions
  //these reducers update the state based on the status of redux functions
  extraReducers: (builder) =>{
    builder
        //case 1
        //if status of redux function is pending
        .addCase(register.pending,(state) => {
          state.isLoading = true
    })
        //case 2
        //if status of redux function is fulfilled
        .addCase(register.fulfilled,(state, action) => {

          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
    })
        //case 3
        //if status of redux function is rejected
    .addCase(register.rejected,(state, action) => {

      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
        //case 4
        //if status of redux function is pending
        .addCase(login.pending,(state) => {
          state.isLoading = true
        })

        //case 5
        //if status of redux function is fulfilled
        .addCase(login.fulfilled,(state, action) => {

          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })

        //case 6
        //if status of redux function is rejected
        .addCase(login.rejected,(state, action) => {

          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        //case 7
        //if status of redux function is fulfilled
        .addCase(logout.fulfilled,(state) =>{
          state.user = null
    })

  }
})

//export reducer actions
export const {reset} = authSlice.actions

//export reducer functions
export default authSlice.reducer
