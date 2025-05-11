import { Box, Input, Typography } from "@mui/material";
import ModeSelect from "../ModeSelect/ModeSelect";
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as trelloIcon } from '~/assets/trello.svg';
import Worksprace from "./Menu/Workspace";
import Recent from "./Menu/Recent";
import Starred from "./Menu/Starred";
import Templates from "./Menu/Templates";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profile from "./Menu/Profile";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";

function AppBar() {
  const [searchValue, setSearchValue] = useState('')



  return (
    // p1
    <Box sx={{
      backgroundColor: '',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
      '&::-webkit-scrollbar-track': { m: 1 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to="/boards">
        <Tooltip title="Board list">
        <AppsIcon sx={{ color: 'white', marginLeft: '12px', verticalAlign : 'middle' }} />
        </Tooltip>
        </Link>
      <Link to='/'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloIcon}
            inheritViewBox
            sx={{ color: 'white' }}
          />
          <Typography variant="h6" component="div" sx={{ color: 'white', gap: 1 }}>
            Flanify </Typography>
          <Box sx={{ display: { xs: ' none', md: 'flex' }, gap: 1 }}>
            <Worksprace />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined"
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none' }
              }}
              startIcon={<AddIcon />}>Create</Button>
          </Box>
        </Box>
      </Link>
      </Box>
      
      {/* p2 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: '12px' }}>
        <TextField
          id="outlined-basic"
          label=" Search"
          type="text" variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{
                    color: searchValue ? 'white' : 'transparent',
                    fontSize: 'medium', cursor: 'pointer'
                  }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '80px',
            maxWidth: '170px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
            },
          }}
        />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" >
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'white' }} />
        </Tooltip>
        <ModeSelect />
        <Profile />
      </Box>

    </Box>
  );
}

export default AppBar;