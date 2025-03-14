import { Box, Tooltip, Typography } from "@mui/material";
import Card from './Card/Card';


function ListCards(){

return(
    <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(${theme.trello.BoardContentHeight} - ${theme.trello.ColummHeaderHeigh} - ${theme.trello.ColummFooterHeigh} - ${theme.spacing(4)})`,
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '9px',
            cursor: 'pointer',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894',

        },

    }}>
     <Card />
     <Card temporaryHideMedia />
     <Card temporaryHideMedia />
     <Card temporaryHideMedia />

    </Box>

)
}
export default ListCards