import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header/>
    <RouterProvider router={router} ></RouterProvider>

  </StrictMode>,
)
