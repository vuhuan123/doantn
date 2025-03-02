import { useState } from 'react'
import Button from '@mui/material/Button';
import { ThreeDRotation } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
 function ModeselectModeselect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);
    console.log(newMode);
    
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="lable-select-dark-light-modemode">Mode</InputLabel>
        <Select
          labelId="lable-select-dark-light-modemode"
          id="demo-simple-select-autowidth"
          value={mode}
          onChange={handleChange}
          autoWidth
          label="Mode"
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value="light">
           <Box sx={{display: 'flex', alignItems:"center", gap: 1}}>
              <LightModeIcon fontSize='small' /> Light
          </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box style={{display: 'flex', alignItems:"center", gap: 2}}>
             <DarkModeIcon fontSize='small' />  Dark
          </Box>
          </MenuItem>
          <MenuItem value="system">
           <Box sx={{display: 'flex', alignItems:"center", gap: 1}}>
              <SettingsBrightnessIcon /> System
          </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div><ModeselectModeselect /></div>
    <Typography variant="h1" color="text.secondary">Hello world</Typography>
    <Typography variant="h2">Hello world</Typography>
    <Typography variant="h3">Hello world</Typography>
     <Button >Hello world</Button>
     <Button variant="contained">Hello world</Button>
     <Button variant="contained">Hello world</Button>
     <ThreeDRotation />
    </>
  )
}



export default App
