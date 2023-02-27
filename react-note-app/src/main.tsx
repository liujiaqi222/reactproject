import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NewNote from './pages/NewNote/'
import './index.css'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'new',
        element: <NewNote />,
      },
      {
        path: '/:id',
        children: [
          {
            index: true, element: <h1>show</h1>
          },
          {
            path: 'edit',
            element: <h1>edit</h1>,
          }
        ]
      }
    ]
  },
  // 没有匹配到的url则重定向到首页
  {
    path: '*',
    element: <Navigate to='/' />
  }
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>
)
