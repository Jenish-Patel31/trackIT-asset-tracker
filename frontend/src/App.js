import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import Dashboard from "./Dashboard";
import AssetTracker from "./AssetTracker";
import Login from "./Login";
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div className='p-3 bg-gray-100 min-h-screen font-sans'>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><AssetTracker /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
