import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {RouterProvider} from 'react-router-dom'
import Router from './Route/Router.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import './App.css'
const queryClient = new QueryClient()

console.log(import.meta.env.VITE_GOOGLE_CLINT_ID);
console.log(import.meta.env);
console.log(window.location.origin);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLINT_ID}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={Router}/>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
