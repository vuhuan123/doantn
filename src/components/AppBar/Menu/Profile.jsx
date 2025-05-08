import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import { Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout'
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser, logoutUserAPI } from '../../../redux/user/userSlice'
import { useConfirm } from "material-ui-confirm";


function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const confirm = useConfirm()
  const handleLogout = async () => {
    const { confirmed } = await confirm({
      title: 'Are you sure logout?',
      description: 'Are you sure?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm',
      buttonOrder: ['confirm', 'cancel'],
  })
    if (confirmed) {
      dispatch(logoutUserAPI())
    }
  }

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'basic-menu-Profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar 
          sx={{ width: 32, height: 32 }}
          alt="Vu Pham"
          src= {currentUser?.avatar}
          >
       
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-Profile"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-Profile"',
        }}
      >
        <MenuItem  sx={{
          '&:hover': { color: 'success.light' },
        }} >
          <Avatar sx={{ width: 28, height: 28, mr: 2 }}
          src={currentUser?.avatar}
          /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{
          '&:hover': {
            color: 'warning.dark',
            '& .logout-icon': { color: 'warning.dark' }
          },
        }}>
          <ListItemIcon>
            <Logout fontSize="small" className="logout-icon" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
export default Profile;
