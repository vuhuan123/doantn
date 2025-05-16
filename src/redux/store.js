import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import {activeCardReducer} from './activeCard/activeCardSlice'
import { notificationsReducer } from './notifications/notificationsSlice'
// cau hinh redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // chi dinh reducer user se duoc luu tru
}
// combineReducers se ket hop cac reducer lai voi nhau
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard : activeCardReducer,
  notifications : notificationsReducer
})

 // thuc hien persistReducer 
const persistedReducer = persistReducer(persistConfig, reducers)

// tao store redux
const store = configureStore({
  reducer: persistedReducer,
  // fig waring error redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store
