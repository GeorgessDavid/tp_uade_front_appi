
import './App.css'
import { Header } from './components';
import { Routes, Route} from 'react-router-dom';
import { Home, About } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App;