
import { Box, Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { useEffect } from 'react';
import {
    updateBoardDetailsAPI,
    updateColumnDetailsAPI,
    moveCardToDifferentColumnAPI
} from '~/apis/index.js'
import { cloneDeep } from 'lodash';
// import { mapOrder } from "~/utils/sort"
import { fetchBoardDetailAPI, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ActiveCard from '../../components/Modal/ActiveCard/ActiveCard';
function Board() {
    // const [board, setBoard] = useState(null)
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)
    const { boardId } = useParams()
    useEffect(() => {
        // const boardId = '67f533a965e8e24d5a2c1373'
        dispatch(fetchBoardDetailAPI(boardId))
    }, [dispatch, boardId])
  

    const moveColumns = async (dndOrderedColumns) => {
        const dndOderedColumnsIds = dndOrderedColumns.map(column => column._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOderedColumnsIds
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        // goi API de cap nhat lai vi tri column
        await updateBoardDetailsAPI(board._id, { columnOrderIds: dndOderedColumnsIds })
    }
    const moveCardInTheSameColumn = async (dndOderedCards, dndOderedCardsIds, columnId) => {
        //update cho chuaanr du lieu Board
        // const newBoard = { ...board }
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOderedCards
            columnToUpdate.cardOrderIds = dndOderedCardsIds
        }
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))
        updateColumnDetailsAPI(columnId, { cardOrderIds: dndOderedCardsIds })
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
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))
        // goi API xu ly Backend
        let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId).cardOrderIds
        // xu ly truong hop chuyen card sang column khac ma column khong co card nao
        if (prevCardOrderIds[0].includes('placeholder-card')) {
            prevCardOrderIds = []
        }
        moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId).cardOrderIds,
        })
    }
    // Xu ly xoa column va card

    if (!board) {
    //    return  <PageLoadingSpinner text="Loading Board"/> 
    return <div>loading...</div>
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
           {/* {activeCard && <ActiveCard />}  */}
            <ActiveCard />
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </ Container>
    )
}



export default Board
