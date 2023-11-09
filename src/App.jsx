import './App.css';
import Navbar from './components/navbar/Navbar';
import Body from './pages/landing/body/Body';

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
    </>
  )
}

export default App
