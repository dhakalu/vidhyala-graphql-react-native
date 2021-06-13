import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  params: {
    headerTitle?: string | undefined,
    [key: string]: number | string | undefined,
  },
}

interface AddParameterPayload {
  key: string,
  value: string,
}

const initialState : NavigationState = {
  params: {}
}

export const counterSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setParameter: (state, { payload }) => {
        const { params } = payload;
        state.params = params;
    },
    addParameter: (state, action: PayloadAction<AddParameterPayload>) => {
      const { key, value } = action.payload;
      state.params[key] = value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setParameter, addParameter } = counterSlice.actions

export default counterSlice.reducer