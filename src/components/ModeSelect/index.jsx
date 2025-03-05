
import { Box } from '@mui/material';
import {
  useColorScheme,
} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

function Modeselect() {
    const { mode, setMode } = useColorScheme();
  
    const handleChange = (event) => {
      const newMode = event.target.value;
      setMode(newMode);
      console.log(newMode);
  
    };
  
    return (
      <div>
        <FormControl size='small' sx={{ m: 1, minWidth: 80, }}>
          <InputLabel id="lable-select-dark-light-modemode">Mode</InputLabel>
          <Select
            labelId="lable-select-dark-light-modemode"
            id="demo-simple-select-autowidth"
            value={mode}
            onChange={handleChange}
            autoWidth
            label="Mode"
          >
            <MenuItem value="light">
              <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
                <LightModeIcon fontSize='small' /> Light
              </Box>
            </MenuItem>
            <MenuItem value="dark">
              <Box sx={{ display: 'flex', alignItems: "center", gap: 2 }}>
                <DarkModeIcon fontSize='small' />  Dark
              </Box>
            </MenuItem>
            <MenuItem value="system">
              <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
                <SettingsBrightnessIcon /> System
              </Box>
  
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  export default Modeselect;