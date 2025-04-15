import { Box, Tooltip, Typography } from "@mui/material";
import Card from './Card/Card';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';

function ListCards({cards}){



return(
    <SortableContext  items={cards?.map(c=>c._id)} strategy={verticalListSortingStrategy} >
        <Box sx={{
            p: '0 5px 5px 5px',
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

    {cards?.map((card)=>  <Card  key={card._id} card= {card} /> )}
    
    
        </Box>
    </SortableContext>

)
}
export default ListCards