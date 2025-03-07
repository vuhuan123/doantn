import { Box, Typography } from "@mui/material";
import Modeselect from "../ModeSelect";
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
function AppBar() {
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
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main', marginLeft: '12px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloIcon}
            inheritViewBox
            sx={{ color: 'primary.main' }}
          />
          <Typography variant="h6" component="div" sx={{ color: 'primary.main', gap: 1 }}>
            Trello </Typography>
          <Box sx={{ display: {xs:' none', md: 'flex'}, gap: 1 }}>
          <Worksprace />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddIcon />}>Create</Button>
          </Box>
        </Box>
      </Box>
      {/* p2 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: '12px' }}>
        <TextField id="outlined-basic" label="Search.." type="search" variant="outlined" size="small" sx={{minWidth: '80px'}} />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" >
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'primary.main' }} />
        </Tooltip>
        <Modeselect />
        <Profile />
      </Box>

    </Box>
  );
}

export default AppBar;