import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/main/dashboard/Dashboard';
import Notification from './pages/main/notification/Notification';
import OrderCreation from './pages/main/orders/order-creation/OrderCreation';
import Profile from './pages/main/profile/Profile';
import Settings from './pages/main/settings/Settings';
import OrderView from './pages/main/orders/order-view/OrderView';
import Login from './pages/main/login/Login';
import { useAuthContext } from './providers/AuthProvider';
import Register from './pages/main/register/Register';
import PasswordReset from './pages/main/reset-password/PasswordReset';
import SetPassword from './components/main/modal/set-password/SetPassword';
import BadToken from './pages/main/bad-token/BadToken';
import ExpiredToken from './pages/main/expired-token/ExpiredToken';
import ActivateAccount from './components/main/modal/set-password/activate-account/ActivateAccount';
import { useState } from 'react';
import Navbar from './components/main/navbar/Navbar';
import SideNav from './components/main/sidenav/SideNav';
import Completed from './pages/main/orders/completed/Completed';
import InProgress from './pages/main/orders/in-progress/InProgress';
import Available from './pages/main/orders/available/Available';

function App() {
  const { userToken, loadedUserProfile } = useAuthContext();

  const Main = ()  => {

    return (
      <>
        <main className="app">
          <SideNav />
          <div className='app-main-content'>
            <Navbar />
            <div className='routes'>
              <Routes>
                <Route path='/' element={<Dashboard />}/> 
                <Route path='/available' element={<Available/>} />
                <Route path='/in-progress' element={<InProgress/>}/> 
                <Route path='/completed'element={<Completed/>}/>
                <Route path='/notifications' element={<Notification/>}/>
                <Route path='/create-task' element={<OrderCreation/>}/>        
                <Route path='/profile' element={<Profile/>}/>       
                <Route path='/settings' element={<Settings/>}/> 
                <Route path='/order/:orderId' element={<OrderView/>}/>
              </Routes> 
            </div>   
          </div>                  
        </main> 
        {
          loadedUserProfile?.is_verified === 'False' && <ActivateAccount token={userToken} email={loadedUserProfile?.email}/>
        }       
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='reset-password' element={<PasswordReset/>}/>
        <Route path='/used-token/:uidb64/:token/' element={<ExpiredToken/>} />
        <Route path='/bad-token/:uidb64/:token/' element={<BadToken/>} />            
        <Route path='/set-new-password/:uidb64/:token/' element={<SetPassword/>}/>
        <Route path='register' element={<Register/> }/>
        <Route path='/app/*' element={userToken?<Main/>:<Login/>}/>
      </Routes>
    </>
  )
}

export default App
