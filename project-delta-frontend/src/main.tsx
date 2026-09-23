import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import { Placesprovider } from './context/PlacesContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Placesprovider>
      <App />
    </Placesprovider>
    </BrowserRouter>
  </StrictMode>,
)
