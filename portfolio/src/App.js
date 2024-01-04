import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login'
import RegisterPage from './components/Register'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={</>} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
