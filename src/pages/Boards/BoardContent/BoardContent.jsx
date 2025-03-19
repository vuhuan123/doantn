import { Box, Tooltip, Typography } from "@mui/material";
import ListColumms from "./ListColumm/ListColumms";
import { mapOrder } from "~/utils/sort";
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

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

    useEffect( ()=>{
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOderedColumnsState(orderedColumns)
    }, [board])
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
    }
    return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
        <Box sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            width: '100%',
            display: 'flex',
            height: (theme) => theme.trello.BoardContentHeight,
        }}>
            <ListColumms columns = {oderedColumnsState} />
        </Box>
    </DndContext>

    )
}

export default BoardContent