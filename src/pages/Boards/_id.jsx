
import { Box, Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '../../apis/mock-data';
import { useEffect, useState} from 'react';
import {fecthBoardDetailsAPI} from '~/apis/index.js'

function Board() {
const [board, setBoard] = useState(null)
useEffect(() => {
    const boardId = '67f1499481f8c59d0235408e'
    fecthBoardDetailsAPI(boardId)
        .then((data) => setBoard(data))
        .catch((error) => console.error('Error fetching board details:', error));
},[])
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} />
        </ Container>
    )
}



export default Board
