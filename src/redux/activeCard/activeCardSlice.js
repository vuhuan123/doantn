import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard : false
}


// Khoi tao 1 slice trong kho luu tru redux
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  reducers: {
    showModalActiveCard : (state) =>{
     state.isShowModalActiveCard = true
    },

    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
       state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard : (state, action) => {
        const fullCard = action.payload
        state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {}
})

// Action la noi danh cho cac component ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer 
export const { clearAndHideCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions
//selectors: La noi danh cho cac component ben duoi goi de lay du lieu tu redux store
export const selectCurrentActiveCard = (state) => {
 return state.activeCard.currentActiveCard
}
export const selectIsShowModalActiveCard = (state) => {
 return state.activeCard.isShowModalActiveCard
}
// export default activeBoardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer