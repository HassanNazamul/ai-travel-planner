import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header'
import CreateTrip from './createtrip/CreateTrip'
import { Toaster } from './components/ui/sonner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <Header />
    <RouterProvider router={router} ></RouterProvider>

  </StrictMode>,
)
