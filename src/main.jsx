import { StrictMode } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import theme from './theme';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from "material-ui-confirm";
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store.js';
import { Provider } from 'react-redux'
// cau hinh react-router-dom
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)
// Ki thuat inject store cho axios
import { injectStore } from './utils/authorizeAios'

injectStore(store)
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <CssVarsProvider theme={theme}>
            <ConfirmProvider defaultOptions={{
              allowClose: false,
              dialogProps: { maxWidth: 'xs' },
              confirmationButtonProps: { color: 'error' },
              cancellationButtonProps: { color: 'primary' },
            }}>
              <GlobalStyles styles= {{a : { textDecoration : 'none'}}} />
              <CssBaseline />
              <App />
              <ToastContainer />
            </ConfirmProvider>
          </CssVarsProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
  </StrictMode>,
)
