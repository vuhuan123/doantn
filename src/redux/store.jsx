import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
 const store = configureStore({
  reducer: {activeBoard: activeBoardReducer},
})

export default store