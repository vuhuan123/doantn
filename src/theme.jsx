
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMM_HEADER_HEIGHT = '56px'
const COLUMM_FOOTER_HEIGHT = '56px'
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeigh: BOARD_BAR_HEIGHT,
    BoardContentHeight: BOARD_CONTENT_HEIGHT,
    ColummHeaderHeigh : COLUMM_HEADER_HEIGHT,
    ColummFooterHeigh : COLUMM_FOOTER_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '6px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '9px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894',
        
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root:({theme})  => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root:{
          '&.MuiTypography-body1': {
            fontSize: '0.875rem',
          },
        }
      },
    },
    
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.5px !important',
          },
          '&:hover fieldset': {
            borderWidth: '1px !important',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        }
      },
    },
  },
});

export default theme;