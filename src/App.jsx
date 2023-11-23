import './App.css';
import Navbar from './components/navbar/Navbar';
import Body from './pages/landing/body/Body';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Sidenav from './components/main/sidenav/Sidenav';
import Dashboard from './pages/main/dashboard/Dashboard';

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
        <Dashboard />  
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route exact path='/' element={<BodyContent/>}/>
        <Route path='/app' element={<Main/>}/>
      </Routes>
    </>
  )
}

export default App
