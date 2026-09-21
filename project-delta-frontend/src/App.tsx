import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './Components'
import { HomePage } from './Pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
