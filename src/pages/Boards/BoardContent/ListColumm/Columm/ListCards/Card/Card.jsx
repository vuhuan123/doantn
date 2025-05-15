
import { Box, Tooltip, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from "react-redux";
import { showModalActiveCard, updateCurrentActiveCard } from "../../../../../../../redux/activeCard/activeCardSlice";
function Card({ card }) {
    const dispatch = useDispatch()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
            id: card._id,
            data: { ...card }
        });
        const dndKitCardStyles = {
            touchAction: 'none',
            transform: CSS.Translate.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : undefined,
            border: isDragging ? '1px solid #2ecc71' : undefined
        };

        const setActiveCard = ()=>{
            // Cap nhat data cho active Card
            dispatch(updateCurrentActiveCard(card))
            
            dispatch(showModalActiveCard())
        }
    return (
        <div>
         
        <Box>
            <MuiCard 
            onClick = {setActiveCard}
             ref ={setNodeRef} 
             style = {dndKitCardStyles}
             {...attributes}
             {...listeners}
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
                height : card.FE_PlaceholderCard ? '0px' : 'unset',
                
                '&:hover': {
                  borderColor : (theme)=> theme.palette.primary.main,
                },
            }}>
                {card?.cover && <CardMedia sx={{ height: 140 }}image={card.cover} />}
             
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>{card.title}</Typography>

                </CardContent>
                <Box sx={{display:' flex'}}>
                {!!card?.memberIds?.length  &&  <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>
                </CardActions>}
                {!!card?.comments?.length  &&  <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button size="small" startIcon={<CommentIcon />}>{card?.comments?.length}</Button>
                </CardActions>}
                {!!card?.attachments?.length  &&  <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>
                </CardActions>}
                </Box>
               
               
            </MuiCard>
            {/* <MuiCard sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
            }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography  >Card 01 </Typography>
                </CardContent>
            </MuiCard> */}
        </Box>
   
        </div>
    )
}

export default Card