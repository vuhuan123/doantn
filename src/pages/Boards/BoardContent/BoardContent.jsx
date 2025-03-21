import { Box, Tooltip, Typography } from "@mui/material";
import ListColumms from "./ListColumm/ListColumms";
import { mapOrder } from "~/utils/sort";
import { DndContext, DragOverlay,PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumm/Columm/Column";
import Card from "./ListColumm/Columm/ListCards/Card/Card";

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLLUM',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}
function BoardContent({board}) {
    // yeeu cau duy chuyen 10px khi hold
   // const pointerSensor = useSensor(PointerSensor, {activationConstraint:{distance: 10}})
    // Yeu cau chuot di chuyen 10px thif ms kich hoat e, fix truowng hop click bi goi e
    const mouseSensors = useSensor(MouseSensor,{activationConstraint:{distance: 10}})
    // Nhan giu 250ms va dung sai cua cam ung thi ms kich hoat e 
    const touchSensor = useSensor(TouchSensor, {activationConstraint:{delay: 250, tolerance: 5}})
    // uu tien su dug ket hop 2 loai sensor laf mouse va touch de co trai nghiem tren mobile to nhat
    const sensors = useSensors(mouseSensors, touchSensor)
    const [oderedColumnsState, setOderedColumnsState] = useState([])

    //cung mot thoi diem chi co mot phan tu dang ddc keo(column or card)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    useEffect( ()=>{
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOderedColumnsState(orderedColumns)
    }, [board])

    //khi bat dau keo 1 phan tu(drag)
    const handleDragStart = (event)=>{
        console.log('handle Start:',  event);
        setActiveDragItemId(event?.active.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }
    //khi ket thuc keo 1 phan tu (drop)
    const handleDragEnd = (event)=>{
        console.log('handleDragEnd: ', event);
        const {active, over} = event
        if(!over) return
        if(active.id !== over.id){
            // lấy vị trí cũ từ thằng active từ event
            const oldIndex = oderedColumnsState.findIndex(c => c._id === active.id)
            // lấy vị trí mới từ thằng active từ event
            const newIndex = oderedColumnsState.findIndex(c => c._id === over.id)
            setOderedColumnsState( arrayMove(oderedColumnsState, oldIndex, newIndex))
        }
        // keo ms co data, k keo thi set null
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }

  const dropAnimation = {
    sideEffects : defaultDropAnimationSideEffects({
        styles:{
            active:{
                opacity: '0.5'
            }
        }
    })
  }
    
    return (
    <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        sensors={sensors} >
        <Box sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            width: '100%',
            display: 'flex',
            height: (theme) => theme.trello.BoardContentHeight,
        }}>
            <ListColumms columns = {oderedColumnsState} />
            <DragOverlay dropAnimation={dropAnimation}>
                {(!activeDragItemType && null)}
                {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
            </DragOverlay>
        </Box>
    </DndContext>

    )
}

export default BoardContent