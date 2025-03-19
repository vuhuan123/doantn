import { Box, Tooltip, Button } from "@mui/material";
import Column from "./Columm/Column";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable';
function ListColumms({columns}) {
   
    return (
        <SortableContext  items={columns?.map(c=>c._id)} strategy={horizontalListSortingStrategy} >
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
                {columns?.map((column)=>  <Column key={column._id} column={column} />)}

                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
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
            </Box>

        </SortableContext>
    )

}

export default ListColumms