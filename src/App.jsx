
import { Box, Container, Typography } from '@mui/material';
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




function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>

      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Modeselect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeigh,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar

      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeigh})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content</Box>
    </ Container>
  )
}



export default App
