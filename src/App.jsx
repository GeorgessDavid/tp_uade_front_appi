
import './App.css'
import { Header } from './components';
import { Routes, Route} from 'react-router-dom';
import { Home, Login } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;