import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAios';
import { API_ROOT } from '~/utils/constant'

const initialState = {
  currentNotification: null,
}
// Nhung hanh dong goi API va cap nhat vao redux, dung middleware createAsyncThunk di kem vs extraReducers
export const fetchInvitationslAPI = createAsyncThunk(
  'notifications/fetchInvitatioslAPI',
  async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)

    return res.data
  }
)
export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ( {status, notificationId} ) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${notificationId}`, {status})

    return res.data
  }
)


// Khoi tao 1 slice trong kho luu tru redux
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotification = null
    },
    updateCurrentNotification: (state, action) => {
    
      state.currentNotification = action.payload
    },
    addNotification : (state, action) => {
    const incomingInvitation = action.payload
    state.currentNotification.unshift(incomingInvitation)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationslAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      state.currentNotification = Array.isArray(incomingInvitations)  ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload
      const getInvitation = state.currentNotification.find(i => i._id === incomingInvitation._id)
        getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

export const {
    clearCurrentNotifications,
    updateCurrentNotification,
    addNotification
} = notificationsSlice.actions
export const selectCurrentNotification = (state) => {
 return state.notifications.currentNotification
}
// export default activeBoardSlice.reducer
export const notificationsReducer = notificationsSlice.reducer