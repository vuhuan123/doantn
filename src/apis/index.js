import axios from "axios"
import {API_ROOT} from '~/utils/constant'
export const fecthBoardDetailsAPI = async( boardId )=>{
    const res = await axios.get(`${API_ROOT}/v1/board/${boardId}`)

    return res.data
}