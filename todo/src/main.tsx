import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodoProvider } from './context/ToDoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <TodoProvider>
    <App />
  </TodoProvider>
)
