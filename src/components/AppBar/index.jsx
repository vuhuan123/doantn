import { Box } from "@mui/material";
import Modeselect from "../ModeSelect";
function AppBar() {
  return (
    <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
    }}>
        <Modeselect />
    </Box>
  );
}  

export default AppBar;