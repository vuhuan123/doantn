// socketIo
import {io} from 'socket.io-client'
import { API_ROOT } from './utils/constant.js'
export const socketIoInstance = io(API_ROOT)
