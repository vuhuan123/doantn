import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'

const store = configureStore({
  reducer: {
    active: activeBoardReducer,
  },
})
export default store
