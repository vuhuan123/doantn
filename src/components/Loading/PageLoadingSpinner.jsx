
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
function PageLoadingSpinner({text}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw',gap: 2 }}>
        <CircularProgress size={50} />
        <Typography variant="h6" color="text.secondary">
           {text}
        </Typography>
    </Box>
  )
}

export default PageLoadingSpinner