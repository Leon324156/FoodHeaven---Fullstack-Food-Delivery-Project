import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Naavbar from "./components/Navbar/Naavbar"
import Sidebar from "./components/Sidebar/Sideebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Messages from './pages/Messages/Messages'
import Orders from "./pages/Orders/Orders"
const App = () => {
  const url = 'http://localhost:4000'
  return (
    
    <div>
    <ToastContainer/>
    <Naavbar/>
    <hr/>
    <div className="app-content">
    <Sidebar/>
    <Routes>
      <Route path = "/add" element={<Add url={url} />}/>
      <Route path = "/list" element={<List url={url} />}/>
      <Route path = "/orders" element={<Orders url={url} />}/>
      <Route path = "/messages" element={<Messages url={url} />}/>
    </Routes>
    </div>
      
    </div>
  )
}

export default App
