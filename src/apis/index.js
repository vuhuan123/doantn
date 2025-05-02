import axios from "axios"
import {API_ROOT} from '~/utils/constant'

// export const fecthBoardDetailsAPI = async( boardId )=>{
//     const res = await axios.get(`${API_ROOT}/v1/board/${boardId}`)

//     return res.data
// }

export const createNewColumnAPI = async( dataCol )=>{
    const res = await axios.post(`${API_ROOT}/v1/columns`, dataCol)

    return res.data
}

export const createNewCardAPI = async( dataCard )=>{
    const res = await axios.post(`${API_ROOT}/v1/cards`, dataCard)

    return res.data
}

export const updateBoardDetailsAPI = async( boardId, updateData )=>{
    const res = await axios.put(`${API_ROOT}/v1/board/${boardId}`, updateData)

    return res.data
}

export const updateColumnDetailsAPI = async( columnId, updateData )=>{
    const res = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)

    return res.data
}

export const deleteColumnDetailsAPI = async( columnId )=>{
    const res = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)

    return res.data
}

export const moveCardToDifferentColumnAPI = async( updateData )=>{
    const res = await axios.put(`${API_ROOT}/v1/board/supports/moving_card`, updateData)

    return res.data
}