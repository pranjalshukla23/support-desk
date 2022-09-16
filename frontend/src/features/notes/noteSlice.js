import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import noteService from './noteService';

//define initial state
const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//redux function
//redux functions use services
//this function will automatically call the extra reducers in slice based on its status
//function to get notes
export const getNotes = createAsyncThunk('notes/getAll',
    async (ticketId, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await noteService.getNotes(ticketId, token);

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
//function to create a ticket note
export const createNote = createAsyncThunk('notes/create',
    async ({noteText, ticketId}, thunkAPI) => {

      try {

        //get token from another slice state variable
        const token = thunkAPI.getState().auth.user.token;

        //calling a service
        return await noteService.createNote(noteText, ticketId, token);

      } catch (error) {

        console.log(error);

        const message = (error.response && error.response.data &&
                error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
      }
    });

//define slice
export const noteSlice = createSlice({

  //slice name
  name: 'note',
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

    builder
        //case 1
        //if status of redux function is pending
        .addCase(getNotes.pending, (state) => {
          state.isLoading = true;
        }).
        //case 2
        //if status of redux function is fulfilled
        addCase(getNotes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.notes = action.payload;
        }).
        //case 3
        //if status of redux function is rejected
        addCase(getNotes.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        //case 4
        //if status of redux function is pending
        .addCase(createNote.pending, (state) => {
          state.isLoading = true;
        }).
        //case 5
        //if status of redux function is fulfilled
        addCase(createNote.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.notes.push(action.payload);
        }).
        //case 6
        //if status of redux function is rejected
        addCase(createNote.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

//export redux actions
export const {reset} = noteSlice.actions;

//export redux reducers
export default noteSlice.reducer;
