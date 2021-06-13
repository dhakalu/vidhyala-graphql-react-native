import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types';

interface AuthenticationState {
  user: User | null,
}

interface LoginActionPayload {
  user: User | null
}

const initialState : AuthenticationState = {
  user: null
}

export const counterSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
        const { user } = action.payload;
        state.user = user;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login } = counterSlice.actions

export default counterSlice.reducer