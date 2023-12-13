import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { OrderProvider } from './providers/OrderProvider.jsx'
import { ChatProvider } from './providers/ChatProvider.jsx'
import { NotificationProvider } from './providers/NotificationProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <OrderProvider>
        <ChatProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ChatProvider>
      </OrderProvider>
    </AuthProvider>
  </BrowserRouter>
)
