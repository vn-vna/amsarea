import React from 'react'
import { Sidebar } from 'flowbite-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/Home'
import AdminUserManager from './admin/Users'
import AdminDashboard from './admin/Dashboard'
import AdminNotification from './admin/Notification'
import AdminOrders from './admin/Orders'
import ClientOrder from './client/ClientOrder'
import TablesManager from './admin/Tables'
import ProductsManager from './admin/Products'

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
                    <Route path="products" element={<ProductsManager />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="tables" element={<TablesManager />} />
                    <Route path="*" element={<div>404</div>} />
                  </>
                ) :
                (
                  <>
                    <Route path="*" element={<div>Sign in</div>} />
                  </>
                )
            }
          </Route>
          <Route path="/" element={<ClientOrder />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
