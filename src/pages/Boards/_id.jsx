
import { Box, Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { useEffect, useState} from 'react';
import {fecthBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis/index.js'
import {generatePlaceholderCard} from '~/utils/fomater.js'
import { isEmpty } from 'lodash';
function Board() {
const [board, setBoard] = useState(null)
console.log(board);

useEffect(() => {
    const boardId = '67f533a965e8e24d5a2c1373'
    fecthBoardDetailsAPI(boardId)
        .then(board => {
            board.columns.forEach(column => {
                if(isEmpty(column.cards)){
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                }
            })
            setBoard(board)
        })
}, [] )
    const createNewColumn = async(newColumnData) => {
        const createdColumn = await createNewColumnAPI({...newColumnData, boardId: board._id})
        const newBoard = {...board}
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
        
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({...newCardData, boardId: board._id})
        
        const newBoard = {...board}
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if(columnToUpdate) {
            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)
            setBoard(newBoard)
        }
    }

    const moveColumns = async ( dndOrderedColumns ) => {
        const dndOderedColumnsIds = dndOrderedColumns.map(column => column._id)
        const newBoard = {...board}
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOderedColumnsIds
        setBoard(newBoard)

        // goi API de cap nhat lai vi tri column
        await updateBoardDetailsAPI(board._id, {columnOrderIds: dndOderedColumnsIds})
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} createNewColumn = {createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} />
        </ Container>
    )
}



export default Board
