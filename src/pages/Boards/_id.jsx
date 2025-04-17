
import { Box, Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { useEffect, useState } from 'react';
import { fecthBoardDetailsAPI, 
    createNewColumnAPI, 
    createNewCardAPI, 
    updateBoardDetailsAPI, 
    updateColumnDetailsAPI,
    moveCardToDifferentColumnAPI
} from '~/apis/index.js'
import { generatePlaceholderCard } from '~/utils/fomater.js'
import { isEmpty } from 'lodash';
import { mapOrder } from "~/utils/sort"
function Board() {
    const [board, setBoard] = useState(null)


    useEffect(() => {
        const boardId = '67f533a965e8e24d5a2c1373'
        fecthBoardDetailsAPI(boardId)
        // sap xep thu tu column luon o day truoc khi dua du lieu xong duoi cac component con
        .then(board => {
            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
            board.columns.forEach(column => {

                    if (isEmpty(column.cards)) {
                        column.cards = [generatePlaceholderCard(column)]
                        column.cardOrderIds = [generatePlaceholderCard(column)._id]
                    } else {
                        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                    }
                })
                setBoard(board)
            })
    }, [])
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id })
        const newBoard = { ...board }
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)
        }
        setBoard(newBoard)
    }

    const moveColumns = async (dndOrderedColumns) => {
        const dndOderedColumnsIds = dndOrderedColumns.map(column => column._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOderedColumnsIds
        setBoard(newBoard)

        // goi API de cap nhat lai vi tri column
        await updateBoardDetailsAPI(board._id, { columnOrderIds: dndOderedColumnsIds })
    }
    const moveCardInTheSameColumn = async (dndOderedCards, dndOderedCardsIds, columnId) => {
        //update cho chuaanr du lieu Board
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOderedCards
            columnToUpdate.cardOrderIds = dndOderedCardsIds
        }
        setBoard(newBoard)
        updateColumnDetailsAPI(columnId, {cardOrderIds: dndOderedCardsIds})
    }

    const moveCardToDifferentColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        // console.log('currentCardId', currentCardId);
        // console.log('prevColumnId', prevColumnId);  
        // console.log('nextColumnId', nextColumnId);
        // console.log('dndOderedColumns', dndOrderedColumns);
        //update cho chuaanr du lieu state Board
        const dndOderedColumnsIds = dndOrderedColumns.map(column => column._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOderedColumnsIds
        setBoard(newBoard)
        // goi API xu ly Backend
        let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId).cardOrderIds 
        // xu ly truong hop chuyen card sang column khac ma column khong co card nao
        if(prevCardOrderIds[0].includes('placeholder-card')){
            prevCardOrderIds= []
        }
        moveCardToDifferentColumnAPI({
            currentCardId, 
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId).cardOrderIds,
        })
    }
    if(!board){
        return <Box>Loading...</Box>
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} 
                createNewColumn={createNewColumn} 
                createNewCard={createNewCard} 
                moveColumns={moveColumns} 
                moveCardInTheSameColumn={moveCardInTheSameColumn} 
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </ Container>
    )
}



export default Board
