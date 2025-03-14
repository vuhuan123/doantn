import { Box } from "@mui/material"
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tolltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

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


function BoardBar() {
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
                <Chip icon={<DashboardIcon />} label="Pham Vu" clickable
                    sx={MERN_STYLES}

                />
                <Chip icon={<VpnLockIcon />} label="Public/Private Workspace" clickable
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
                <AvatarGroup
                    max={4}
                    sx={{
                        gap: '5px',
                        cursor: 'pointer',
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            fontSize: 16,
                            border: 'none',
                            color: 'white',
                            '&:fist-of-type': { bgcolor: '#a4b0be' },
                        }
                    }}
                >
                    <Tolltip title="Pham Vu 001" >
                        <Avatar alt="Pham Vu 003" src="https://yt3.ggpht.com/ytc/AIdro_nD1ahyug_Kad8D7hSWEsXnc-avy7exMe-Dampww9N_SCuZ_sO-UdbFttBsvdxNXLLbkg=s88-c-k-c0x00ffffff-no-rj" />
                    </Tolltip>
                    <Tolltip title="Pham Vu 002" >
                        <Avatar alt="Bham Vu 003" src="/static/images/avatar/1.jpg" />
                    </Tolltip>
                    <Tolltip title="Pham Vu 003" >
                        <Avatar alt="Cham Vu 003" src="/static/images/avatar/1.jpg" />
                    </Tolltip>
                    <Tolltip title="Pham Vu 004" >
                        <Avatar alt="Dham Vu 003" src="/static/images/avatar/1.jpg" />
                    </Tolltip>
                    <Tolltip title="Pham Vu 004" >
                        <Avatar alt="Dham Vu 003" src="/static/images/avatar/1.jpg" />
                    </Tolltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar