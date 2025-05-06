import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAios';
import { API_ROOT } from '~/utils/constant'
import { generatePlaceholderCard } from '~/utils/fomater.js'
import { isEmpty } from 'lodash';
import { mapOrder } from "~/utils/sort"

const initialState = {
  currentActiveBoard: null,
}
// Nhung hanh dong goi API va cap nhat vao redux, dung middleware createAsyncThunk di kem vs extraReducers
export const fetchBoardDetailAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailAPI',
  async (boardId) => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/board/${boardId}`)

    return res.data
  }
)
// Khoi tao 1 slice trong kho luu tru redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload
      state.currentActiveBoard = board
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
      let board = action.payload
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      state.currentActiveBoard = board
    })
  }
})

// Action la noi danh cho cac component ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer 
export const { updateCurrentActiveBoard } = activeBoardSlice.actions
//selectors: La noi danh cho cac component ben duoi goi de lay du lieu tu redux store
export const selectCurrentActiveBoard = (state) => {
 return state.activeBoard.currentActiveBoard
}
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer