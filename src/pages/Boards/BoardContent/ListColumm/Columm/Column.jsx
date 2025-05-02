import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCardIcon from '@mui/icons-material/AddCard';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DragHandle } from "@mui/icons-material";
import ListCards from "./ListCards/ListCards";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import {createNewCardAPI,} from '~/apis/index.js'
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { deleteColumnDetailsAPI} from '~/apis/index.js'

function Column({ column }) {
    const board = useSelector(selectCurrentActiveBoard)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const [newCardTittle, setNewCardTittle] = useState('')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }
    const addNewCard = async () => {
        if (!newCardTittle) {
            toast.error('Please enter card name', { position: 'bottom-right' })
            return
        }
        const newCardData = {
            title: newCardTittle,
            columnId: column._id,
        }
          const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })
        
                const newBoard = cloneDeep(board)
                const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
                if (columnToUpdate) {
                    columnToUpdate.cards.push(createdCard)
                    columnToUpdate.cardOrderIds.push(createdCard._id)
                }
                // setBoard(newBoard)
                dispatch(updateCurrentActiveBoard(newBoard))
        toggleNewCardForm()
        setNewCardTittle('')
    }

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column }
    });
    const dndKitColumnStyles = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    };
    const confirm = useConfirm();

    const handleDeleteColumm = async () => {
        const { confirmed } = await confirm({
            title: 'Delete column?',
            description: 'Are you sure?',
            cancellationText: 'Cancel',
            confirmationText: 'Confirm',
            buttonOrder: ['confirm', 'cancel'],
        });
        if (confirmed) {
            const newBoard = { ...board }
            newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
            newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
            // setBoard(newBoard)
            dispatch(updateCurrentActiveBoard(newBoard))
            //Goi API xoa column
            deleteColumnDetailsAPI(column._id)
                .then(res => toast.success(res?.deleteResult))
        }

    }



    //
    const orderedCards = column.cards
    // console.log('oderedcard:', orderedCards);
    return (
        <div
            ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.BoardContentHeight} - ${theme.spacing(4)})`,

                }} >
                {/* Box columm header */}
                <Box sx={{
                    height: (theme) => theme.trello.ColummHeaderHeigh,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        {column.title}
                    </Typography>
                    {/* drop down */}
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMoreIcon
                                id="basic-button-dropdown"
                                aria-controls={open ? 'basic-menu-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ color: 'text.primary,', cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-dropdown"',
                            }}
                        >
                            <MenuItem onClick={toggleNewCardForm}>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText >Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopy fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Coppy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPaste fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={handleDeleteColumm}
                                sx={{
                                    '&:hover':
                                    {
                                        color: 'warning.dark',
                                        '& .delete-column': {
                                            color: 'warning.dark',
                                        },
                                    }
                                }}>
                                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                <ListItemText className="delete-column">Delete columm</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive this columm</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* Box list card */}
                <ListCards cards={orderedCards} />


                {/* Box columm footer */}

                <Box sx={{
                    height: (theme) => theme.trello.ColummFooterHeigh,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {!openNewCardForm
                        ?
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Button startIcon={<AddCardIcon />} onClick={toggleNewCardForm}> Add new card</Button>
                            <Tooltip title="Drag to move">
                                <DragHandle sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <TextField
                                label=" Enter card name..."
                                type="text" variant="outlined"
                                size="small"
                                autoFocus
                                data-no-dnd="true"
                                value={newCardTittle}
                                onChange={(e) => setNewCardTittle(e.target.value)}

                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: (theme) => theme.palette.main,
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white',
                                    },
                                    '& label.Mui-focused': { color: (theme) => theme.palette.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: (theme) => theme.palette.main },
                                        '&:hover fieldset': { borderColor: (theme) => theme.palette.main },
                                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.main },
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                <Button data-no-dnd="true" variant="contained" color="success" size="small" onClick={addNewCard}
                                    sx={{
                                        mr: 1,
                                        border: '0.5px solid transparent',
                                        borderColor: (theme) => theme.palette.main,
                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.main,
                                        },
                                        ml: 1,
                                    }}>Add</Button>
                                <CloseIcon
                                    sx={{
                                        color: (theme) => theme.palette.warning.light,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toggleNewCardForm()}
                                />
                            </Box>
                        </Box>
                    }
                </Box>

            </Box>
        </div>
    )
}

export default Column