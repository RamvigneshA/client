import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route  path='books' element={<Books />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update/:id" element={<Update />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
   
  </StrictMode>,
)
