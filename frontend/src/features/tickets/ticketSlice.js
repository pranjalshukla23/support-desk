import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ticketService from './ticketService';

//define initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to create a ticket
export const createTicket = createAsyncThunk('tickets/create',
    async (ticketData, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await ticketService.createTicket(ticketData, token);

      } catch (error) {

        console.log(error);

        const message = (error.response && error.response.data &&
                error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
      }
    });

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to get user tickets
export const getTickets = createAsyncThunk('tickets/getAll',
    async (_, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await ticketService.getTickets(token);

      } catch (error) {

        console.log(error);

        const message = (error.response && error.response.data &&
                error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
      }
    });

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to get user ticket
export const getTicket = createAsyncThunk('tickets/get',
    async (ticketId, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await ticketService.getTicket(ticketId, token);

      } catch (error) {

        console.log(error);

        const message = (error.response && error.response.data &&
                error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
      }
    });

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to close ticket
export const closeTicket = createAsyncThunk('tickets/close',
    async (ticketId, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await ticketService.closeTicket(ticketId, token);

      } catch (error) {

        console.log(error);

        const message = (error.response && error.response.data &&
                error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
      }
    });

//define a slice
export const ticketSlice = createSlice({

  //slice name
  name: 'tickets',
  //initial state
  initialState,

  //reducers
  //reducers get executed based on action type
  //reducers update the state based on action type
  reducers: {
    //redux action
    //reset action and what will happen if this action is called
    reset: (state) => initialState,
  },

  //extra reducers
  //extra reducers are called by createAsyncThunk automatically
  //these reducers get executed based on the status of redux functions
  //these reducers update the state based on the status of redux functions
  extraReducers: (builder) => {

    builder.
        //case 1
        //if status of redux function is pending
        addCase(createTicket.pending, (state) => {
          state.isLoading = true;
        }).
        //case 2
        //if status of redux function is fulfilled
        addCase(createTicket.fulfilled, (state) => {
          state.isLoading = false;
          state.isSuccess = true;
        }).
        //case 3
        //if status of redux function is rejected
        addCase(createTicket.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }).

        //case 4
        //if status of redux function is pending
        addCase(getTickets.pending, (state) => {
          state.isLoading = true;
        }).
        //case 5
        //if status of redux function is fulfilled
        addCase(getTickets.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.tickets = action.payload;
        }).
        //case 6
        //if status of redux function is rejected
        addCase(getTickets.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        //case 7
        //if status of redux function is pending
        .addCase(getTicket.pending, (state) => {
          state.isLoading = true;
        }).
        //case 8
        //if status of redux function is fulfilled
        addCase(getTicket.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.ticket = action.payload;
        }).
        //case 9
        //if status of redux function is rejected
        addCase(getTicket.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })

        //case 10
        //if status of redux function is fulfilled
        .addCase(closeTicket.fulfilled, (state, action) => {
          state.isLoading = false;
          state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket)
        })
  },

});

//export redux actions
export const {reset} = ticketSlice.actions;
//export redux functions
export default ticketSlice.reducer;
