import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./mainbyz.css"
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import { Placesprovider } from './context/PlacesContext.tsx'
import TourProvider from './context/TourContext.tsx'
import { FavouritesProvider } from './context/FavouritesContext.tsx'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Placesprovider>
        <FavouritesProvider>
          <TourProvider>
            <App />
          </TourProvider>
        </FavouritesProvider>
      </Placesprovider>
    </BrowserRouter>
  </StrictMode>,
)