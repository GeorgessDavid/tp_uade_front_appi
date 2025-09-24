
import './App.css'
import { Header } from './components';
import { Routes, Route } from 'react-router-dom';
import ThemeRegistry from './ThemeRegistry';
import { Home, Login, Appointments } from './pages';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ThemeRegistry>
      <ToastContainer position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ background: "#101219", minWidth: "400px", maxWidth: "800px", color: "#fff" }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </ThemeRegistry>
  )
}

export default App;