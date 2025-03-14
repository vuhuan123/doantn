import { Box, Tooltip, Button } from "@mui/material";
import Columm from "./Columm/Columm";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function ListColumms() {
   
    return (

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

            {/* Box Columm 1*/}
           <Columm />
           <Columm />
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

    )

}

export default ListColumms