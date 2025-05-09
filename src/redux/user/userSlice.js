import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '~/utils/authorizeAios';
import { API_ROOT } from '~/utils/constant'

const initialState = {
  currentUser: null,
}
// Nhung hanh dong goi API va cap nhat vao redux, dung middleware createAsyncThunk di kem vs extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)

    return res.data
  }
)

// update user
export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return res.data
  }
)
export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const res = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage){
      toast.success('Logout successfully!')
    }
    return res.data
  }
)
// Khoi tao 1 slice trong kho luu tru redux
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Noi xu ly dong bo cac action tu redux
  reducers: {},
  // Noi xu ly bat dong cac action tu redux
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
    
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }

})

// export const {} = userSlice.actions
export const selectCurrentUser = (state) => {
 return state.user.currentUser
}

export const userReducer = userSlice.reducer