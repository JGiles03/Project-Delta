import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './Components'
import { HomePage, LoginPage, SignupPage, MapPage, ListPage, AccountPage } from './Pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<Header />}>
          <Route index element={<MapPage />} />
          <Route path='list' element={<ListPage />} />
          <Route path='account' element={<AccountPage />}/>
        </Route>
        {/* <Route path='/*' element={<h1>Page Not found</h1>} /> */}
      </Routes>
    </>
  )
}

export default App
