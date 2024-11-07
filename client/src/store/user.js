import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userId: JSON.parse(sessionStorage.getItem('userData'))?.userId || null,
    userName: JSON.parse(sessionStorage.getItem('userData'))?.userName || '',
    loginTime: JSON.parse(sessionStorage.getItem('userData'))?.loginTime || 'null',
  },
  reducers: {
    setUserData(state, action) {
      const { userId, userName, loginTime } = action.payload
      state.userId = userId
      state.userName = userName
      state.loginTime = loginTime
    },
    reSetUserData(state) {
      state.userId = null
      state.userName = ''
      state.loginTime = 'null'
    }
  }
})

export const { setUserData, reSetUserData } = userSlice.actions
export default userSlice.reducer