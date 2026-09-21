import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './Components'
import { HomePage, LoginPage, SignupPage, MapPage, ListPage, AccountPage } from './Pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/list' element={<ListPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
