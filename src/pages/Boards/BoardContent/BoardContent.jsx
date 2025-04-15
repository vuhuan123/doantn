import { Box, Tooltip, Typography } from "@mui/material";
import ListColumms from "./ListColumm/ListColumms";
import { mapOrder } from "~/utils/sort";
import { DndContext, 
    DragOverlay, 
    useSensor,
    useSensors, 
    // MouseSensor, 
    // TouchSensor, 
    defaultDropAnimationSideEffects, 
    closestCorners 
} from "@dnd-kit/core";
import {MouseSensor, TouchSensor} from '~/customLibarary/DndkitSensor'
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumm/Columm/Column";
import Card from "./ListColumm/Columm/ListCards/Card/Card";
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from "~/utils/fomater";

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLLUM',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}
function BoardContent({ board, createNewColumn, createNewCard }) {
    // yeeu cau duy chuyen 10px khi hold
    // const pointerSensor = useSensor(PointerSensor, {activationConstraint:{distance: 10}})
    // Yeu cau chuot di chuyen 10px thif ms kich hoat e, fix truowng hop click bi goi e
    const mouseSensors = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    // Nhan giu 250ms va dung sai cua cam ung thi ms kich hoat e 
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    // uu tien su dug ket hop 2 loai sensor laf mouse va touch de co trai nghiem tren mobile to nhat
    const sensors = useSensors(mouseSensors, touchSensor)
    const [oderedColumnsState, setOderedColumnsState] = useState([])

    //cung mot thoi diem chi co mot phan tu dang ddc keo(column or card)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState()
    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOderedColumnsState(orderedColumns)
    }, [board])
    // Tim mot cai column theo CardId
    const findColumnByCardId = (cardId) => {
        return oderedColumnsState.find(column => column?.cards.map(card => card._id)?.includes(cardId))
    }

    const moveCardBetwwenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOderedColumnsState(prev => {
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id == overCardId)
            // console.log(overCardIndex);
            let newCardIndex;
            const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
            const modifier = isBelowOverItem ? 1 : 0
            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1;
            const nextColumns = cloneDeep(prev)
            const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
            const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
            if (nextActiveColumn) {
                //xoas card o column active 
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                if (isEmpty(nextActiveColumn.cards)) {
                    // console.log('card cuoi bi keo di');
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                }
                // capnhat lai mang orderIds cho du lieu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
            }
            if (nextOverColumn) {
                // kiem tra xem card dang keo no co ton tai o overcolumn chua, neu cos thif caanf xoas no truoc                   
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id

                }
                //tiep theo la them cai card dang keo vao overColumn theo vi tri index moi
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

                nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
            }

            return nextColumns
        })
    }
    //khi bat dau keo 1 phan tu(drag)
    const handleDragStart = (event) => {
        // console.log('handle Start:',  event);
        setActiveDragItemId(event?.active.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        //neu keo card thi ms thuc hien hanh dong set gia tri oldColumn
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    const handleDragOver = (event) => {
        // console.log('handleDragOver:', event);
        // keo column thi return
        if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }
        const { active, over } = event
        if (!active || !over) {
            return
        }
        // activeDraggingCardData: la card dang duoc keo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        // overCard : la card dang tuong tac tren hoac duoi so voi card duoc keo o tren
        const { id: overCardId } = over
        // Tim  2 cai column
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        if (!activeColumn || !overColumn) {
            return
        }
        if (activeColumn._id !== overColumn._id) {
            moveCardBetwwenDifferentColumns(overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData)
        }


    }
    //khi ket thuc keo 1 phan tu (drop)
    const handleDragEnd = (event) => {
        // console.log('handleDragEnd: ', event);
        const { active, over } = event
        if (!over || !active) return

        // Xu ly keo tha Card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // activeDraggingCardData: la card dang duoc keo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            // overCard : la card dang tuong tac tren hoac duoi so voi card duoc keo o tren
            const { id: overCardId } = over
            // Tim  2 cai column
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)
            if (!activeColumn || !overColumn) {
                return
            }
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                // console.log('hanh dong keo tha card giua hai col khac nhau');
                moveCardBetwwenDifferentColumns(overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData)
            } else {
                // Hanh dong keo tha card trong cung column

                // Lay vi tri cu tu oldColumnWhenDraggingCard
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
                // lấy vị trí mới từ thằng active từ event
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
                const dndOderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
                setOderedColumnsState(prev => {
                    const nextColumns = cloneDeep(prev)
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    targetColumn.cards = dndOderedCards
                    targetColumn.cardOrderIds = dndOderedCards.map(card => card._id)
                    return nextColumns
                })
            }
        }
        // Xu ly keo tha Column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                // lấy vị trí cũ từ thằng active từ event
                const oldColumnIndex = oderedColumnsState.findIndex(c => c._id === active.id)
                // lấy vị trí mới từ thằng active từ event
                const newColumnIndex = oderedColumnsState.findIndex(c => c._id === over.id)
                setOderedColumnsState(arrayMove(oderedColumnsState, oldColumnIndex, newColumnIndex))
            }
        }

        // keo ms co data, k keo thi set null
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }



    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                }
            }
        })
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
        >
            <Box sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
                width: '100%',
                display: 'flex',
                height: (theme) => theme.trello.BoardContentHeight,
            }}>
                <ListColumms columns={oderedColumnsState} createNewColumn = {createNewColumn} createNewCard={createNewCard} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {(!activeDragItemType && null)}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>

    )
}

export default BoardContent