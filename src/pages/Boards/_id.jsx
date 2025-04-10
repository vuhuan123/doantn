
import { Box, Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';
import { useEffect, useState} from 'react';
import {fecthBoardDetailsAPI} from '~/apis/index.js'

function Board() {
const [board, setBoard] = useState(null)
console.log(board);

useEffect(() => {
    const boardId = '67f533a965e8e24d5a2c1373'
    fecthBoardDetailsAPI(boardId)
        .then((data) => setBoard(data))
        .catch((error) => console.error('Error fetching board details:', error));
},[])
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={mockData.board} />
            <BoardContent board={mockData.board} />
        </ Container>
    )
}



export default Board
