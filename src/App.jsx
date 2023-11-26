import './App.css';
import Navbar from './components/navbar/Navbar';
import Body from './pages/landing/body/Body';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Sidenav from './components/main/sidenav/Sidenav';
import Dashboard from './pages/main/dashboard/Dashboard';
import Notification from './pages/main/notification/Notification';
import OrderCreation from './pages/main/orders/order-creation/OrderCreation';
import Profile from './pages/main/profile/Profile';
import Settings from './pages/main/settings/Settings';
import OrderView from './pages/main/orders/order-view/OrderView';

function App() {

  const BodyContent = () => {
    return (
      <>
        <Navbar />
        <Body />
        <Footer />
      </>
    )
  }

  const Main = ()  => {

    return (
      <>
        <Sidenav />  
        <Routes>
          <Route path='/' element={<Dashboard />}/>  
          <Route path='notifications' element={<Notification/>}/>
          <Route path='create-task' element={<OrderCreation/>}/>        
          <Route path='profile' element={<Profile/>}/>       
          <Route path='settings' element={<Settings/>}/> 
          <Route path='order/ID' element={<OrderView/>}/>
        </Routes>          
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route exact path='/' element={<BodyContent/>}/>
        <Route path='/app/*' element={<Main/>}/>
      </Routes>
    </>
  )
}

export default App
