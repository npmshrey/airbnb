import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import AuthContextProvider from './Context/Auth.context.jsx'
import UserContextProvider from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <AuthContextProvider>
      <UserContextProvider>

      <App />

      </UserContextProvider>
    </AuthContextProvider>

  </BrowserRouter>

)