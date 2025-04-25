import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {API_ROOT} from '~/utils/constant'
import { generatePlaceholderCard } from '~/utils/fomater.js'
import { isEmpty } from 'lodash';
import { mapOrder } from "~/utils/sort"
// Nhung hanh dong goi API va cap nhat vao redux, dung middleware createAsyncThunk di kem vs extraReducers
export  const fetchBoardDetailAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailAPI',
    async (boardId) =>{
        const res = await axios.get(`${API_ROOT}/v1/board/${boardId}`)

        return res.data
    }
  )
// Khoi tao 1 slice trong kho luu tru redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  // Khoi tao state ban dau
  initialState: {
    currentActiveBoard: null,
  },

  // Reducers: Noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
       // la chuan dat ten nhan du lieu vao reducer, o day chung ta gan no ra mot bien co nghia hon 
      const board = action.payload
      // xu ly du lieu neu can thiet...

      // update lai du lieu cua cai currentActiveBoard trong state
      state.currentActiveBoard = board
    },
    // extraReducers : Noi xu ly du lieu bat dong bo
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action)=>{
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
            // setSate cho currentActiveBoard = action.payload( action.payload : la du lieu tra ve tu API)
            state.currentActiveBoard = action.payload
        })
    }
  }
})

// Action la noi danh cho cac component ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer 
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

//selectors: La noi danh cho cac component ben duoi goi de lay du lieu tu redux store
export const selectCurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer