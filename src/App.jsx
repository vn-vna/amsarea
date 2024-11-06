import React from 'react'
import { Sidebar } from 'flowbite-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/Home'
import AdminUserManager from './admin/Users'
import AdminDashboard from './admin/Dashboard'
import AdminNotification from './admin/Notification'
import AdminOrders from './admin/Orders'

function App() {
  const [signedIn, setSignedIn] = React.useState(true)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            {
              signedIn ?
                (
                  <>
                    <Route path="" element={<AdminHome />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="notifications" element={<AdminNotification />} />
                    <Route path="users" element={<AdminUserManager />} />
                    <Route path="products" element={<div>Products</div>} />
                    <Route path="orders" element={<AdminOrders />} />
                  </>
                ) :
                (
                  <>
                    <Route path="*" element={<div>Sign in</div>} />
                  </>
                )
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
