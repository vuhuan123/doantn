import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  currentActiveCard: null,
}


// Khoi tao 1 slice trong kho luu tru redux
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },
    updateCurrentActiveCard : (state, action) => {
        const fullCard = action.payload
        state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {}
})

// Action la noi danh cho cac component ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer 
export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions
//selectors: La noi danh cho cac component ben duoi goi de lay du lieu tu redux store
export const selectCurrentActiveCard = (state) => {
 return state.activeCard.currentActiveCard
}
// export default activeBoardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer