import { Box, Tooltip, Typography } from "@mui/material";
import ListColumms from "./ListColumm/ListColumms";
import { mapOrder } from "~/utils/sort";
function BoardContent({board}) {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    return (<Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.BoardContentHeight,
    }}>
        <ListColumms columns = {orderedColumns} />
    </Box>

    )
}

export default BoardContent