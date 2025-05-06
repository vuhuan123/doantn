import { StrictMode } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import theme from './theme';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from "material-ui-confirm";
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store.jsx';
import { Provider } from 'react-redux'
// cau hinh react-router-dom
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'error' },
            cancellationButtonProps: { color: 'primary' },
          }}>
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </CssVarsProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
