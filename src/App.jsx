import Board from './pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFoundPage from '~/pages/404/NotFoundPage'
import Auth from './pages/Auth/Auth'
function App() {

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={<Navigate to='boards/67f533a965e8e24d5a2c1373' replace={true} />}  />
      {/* Board detail */}
      <Route path='/boards/:boardId' element={<Board />} />
      {/* Not Found */}
      <Route path='*' element={<NotFoundPage />} />
      {/* Authen */}
      <Route path='/login' element={<Auth />} />
      {/* Register */}
      <Route path='/register' element={<Auth />} />
    </Routes>
  )
}



export default App
