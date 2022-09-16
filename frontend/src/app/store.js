import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'

//bind reducers
export const store = configureStore({

  //add reducers
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer
    },
});
