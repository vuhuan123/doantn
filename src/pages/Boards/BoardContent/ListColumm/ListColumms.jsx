import { Box, Tooltip, Button } from "@mui/material";
import Column from "./Columm/Column";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import {createNewColumnAPI} from '~/apis/index.js'
import { cloneDeep } from 'lodash';
import { generatePlaceholderCard } from '~/utils/fomater.js'
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

function ListColumms({ columns }) {
    const board = useSelector(selectCurrentActiveBoard)
    const dispatch = useDispatch()
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const [newColumnTittle, setNewColumnTittle] = useState('')
    const toggleNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }
    const addNewColumn = async () => {
        if (!newColumnTittle) {
            toast.error('Please enter column name', { position: 'bottom-left' })
            return
        }
        const newColumnData = {
            title: newColumnTittle,
        }
        const createdColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id })

        const newBoard = cloneDeep(board)
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        dispatch(updateCurrentActiveBoard(newBoard))
        toggleNewColumnForm()
        setNewColumnTittle('')
    }
    return (
        <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy} >
            <Box sx={{
                bgcolor: "inherit",
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowy: 'hidden',
                p: '10px 0',
                '&::-webkit-scrollbar-track': { m: 2 }
            }}>

                {/* Box Columm */}
                {columns?.map((column) => <Column key={column._id} column={column} />)}
                {!openNewColumnForm ?
                    <Box onClick={toggleNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button startIcon={<NoteAddIcon />}
                            sx={{
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1
                            }}
                        >Add new columm</Button>
                    </Box>
                    :
                    <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <TextField
                            label=" Enter column name..."
                            type="text" variant="outlined"
                            size="small"
                            autoFocus
                            value={newColumnTittle}
                            onChange={(e) => setNewColumnTittle(e.target.value)}

                            sx={{
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Button className="interceptor-loading" variant="contained" color="success" onClick={addNewColumn} sx={{ mr: 1 }}>Add Column</Button>
                            <CloseIcon

                                sx={{
                                    color: 'white',
                                    fontSize: 'large', cursor: 'pointer'
                                }}
                                onClick={() => toggleNewColumnForm()}
                            />
                        </Box>
                    </Box>
                }

            </Box>

        </SortableContext>
    )

}

export default ListColumms