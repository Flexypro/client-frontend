import './App.css';
import Navbar from './components/navbar/Navbar';
import Body from './pages/landing/body/Body';
import Footer from './components/footer/Footer';

function App() {

  const BodyContent = () => {
    return (
      <>
        <Body />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <BodyContent />
      <Footer />
    </>
  )
}

export default App
