import Board from './pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFoundPage from '~/pages/404/NotFoundPage'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import { Outlet } from 'react-router-dom'
import Settings from './pages/Settings/Settings'
import  Boards from './pages/Boards'
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={<Navigate to='/boards' replace={true}/> }  />

    {/* Chi khi dang nhap ms xu ly dc trong nay */}
    <Route element={<ProtectedRoute user={currentUser} />}>
      {/* Board detail */}
      <Route path='/boards/:boardId' element={<Board />} />
       {/* Board */}
      <Route path='/boards/' element={<Boards />} />
      {/* User Setting */}
      <Route path='/settings/account' element={<Settings />} />
      <Route path='/settings/security' element={<Settings />} />
    </Route> 

      {/* Not Found */}
      <Route path='*' element={<NotFoundPage />} />
      {/* Authen */}
      <Route path='/login' element={<Auth />} />
      {/* Register */}
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />
    </Routes>
  )
}



export default App
