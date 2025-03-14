import { Box, Tooltip, Typography } from "@mui/material";
import ListColumms from "./ListColumm/ListColumms";

function BoardContent() {

    return (<Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.BoardContentHeight,
    }}>
        <ListColumms />
    </Box>

    )
}

export default BoardContent