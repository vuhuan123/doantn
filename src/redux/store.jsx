import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    user: userReducer,
  },
})
export default store
