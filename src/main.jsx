import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Flowbite } from 'flowbite-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Flowbite>
      <App />
    </Flowbite>
  </StrictMode>,
)
