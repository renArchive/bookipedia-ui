import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    session: false,
  },
  reducers: {
    login: (state) => {
      state.session = true;
    },
    logout: (state) => {
      state.session = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer