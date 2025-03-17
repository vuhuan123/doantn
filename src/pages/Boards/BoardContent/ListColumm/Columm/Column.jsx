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
import { mapOrder } from "~/utils/sort";

function Column({column}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds,'_id')
    return (

        <Box sx={{
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
                height: (theme) => theme.trello.ColummHeaderHeigh ,
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
                  { column.title}
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
                        MenuListProps={{
                            'aria-labelledby': 'basic-button-dropdown"',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <AddCardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Add new card</ListItemText>
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
                        <MenuItem>
                            <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Remove columm</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                            <ListItemText>Archive this columm</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            {/* Box list card */}
         <ListCards cards ={orderedCards} />
            {/* Box columm footer */}

            <Box sx={{
                height: (theme) => theme.trello.ColummFooterHeigh,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Button startIcon={<AddCardIcon />}> Add new card</Button>
                <Tooltip title="Drag to move">
                    <DragHandle sx={{ cursor: 'pointer' }} />
                </Tooltip>
            </Box>

        </Box>
    )
}

export default Column