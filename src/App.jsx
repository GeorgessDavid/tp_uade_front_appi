
import './App.css'
import { Header, ProtectedRoute, Footer } from './components';
import { Routes, Route } from 'react-router-dom';
import ThemeRegistry from './ThemeRegistry';
import { Home, Login, Appointments, AppointmentsManage, Insurance } from './pages';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isLogged } = useAuth();

  return (
    <>
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
      <Header logged={isLogged}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/manage" element={
          <ProtectedRoute>
            <AppointmentsManage />
          </ProtectedRoute>
        } />
        <Route path="/insurances" element={
          <ProtectedRoute>
            <Insurance />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeRegistry>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeRegistry>
  )
}

export default App;