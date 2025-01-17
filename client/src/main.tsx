import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RecoilRoot>
            <ToastContainer autoClose={1000} hideProgressBar={true} />
            <App />
        </RecoilRoot>
    </StrictMode>,
)
