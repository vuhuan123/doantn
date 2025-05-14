import { Box } from "@mui/material"
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tolltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { capitallizeFirstLetter } from '~/utils/fomater'
import BoardUserGroup from './BoardUserGroup'

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const MERN_STYLES = {
    color: 'white',
    backgroundColor: 'transparent',
    border: '0.5px solid white',
    paddingX: '5px',
    '.MuiSvgIcon-root': {
        color: 'white',
    }
}


function BoardBar({ board }) {
    return (
        <Box sx={{

            width: '100%',
            height: (theme) => theme.trello.boardBarHeigh,
            display: 'flex',
            paddingX: 2,
            alignItems: 'center',
            borderTop: '1px solid rgb(140, 141, 143)',

            justifyContent: 'space-between',
            gap: 2,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            overflowX: 'auto',
            '&::-webkit-scrollbar-track': { m: 1 }


        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tolltip title={board?.title}>
                    <Chip icon={<DashboardIcon />} label={board?.title} clickable
                         sx={MERN_STYLES}
                    />
                </Tolltip>
                <Chip icon={<VpnLockIcon />} label={capitallizeFirstLetter(board?.type)} clickable
                    sx={MERN_STYLES}

                />
                <Chip icon={<AddToDriveIcon />} label="Add To Google Drive" clickable
                    sx={MERN_STYLES}
                />
                <Chip icon={<BoltIcon />} label="Automation" clickable
                    sx={MERN_STYLES}
                />
                <Chip icon={<FilterListIcon />} label="Filter" clickable
                    sx={MERN_STYLES}
                />
            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="outlined" startIcon={<PersonAddAltIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                        }
                    }}
                >
                    Invite
                </Button>
                <BoardUserGroup boardUsers={board?.FE_allUsers} />
            </Box>
        </Box>
    )
}

export default BoardBar