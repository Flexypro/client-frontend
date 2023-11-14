import './App.css';
import Navbar from './components/navbar/Navbar';
import Body from './pages/landing/body/Body';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
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
        <div>Main</div>
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
