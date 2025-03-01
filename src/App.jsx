import { useState } from 'react'
import Button from '@mui/material/Button';
import { ThreeDRotation } from '@mui/icons-material';
import { Typography } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div><ModeToggle /></div>
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
