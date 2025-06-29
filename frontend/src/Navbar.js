// Navbar.js
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center bg-white shadow-md p-4 mb-5 rounded-md">
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2">
                <Link to="/">
                    <img src="/assetTracker.png" alt="AIVID Logo" className="h-16" />
                </Link>
            </div>

            {/* CENTER: Nav Links */}
            <div className="flex gap-4">
                <Link to="/" className="text-blue-700 text-lg font-semibold hover:text-blue-900 hover:bg-blue-100 px-3 py-1 rounded">
                    AssetTracker
                </Link>
                <Link to="/dashboard" className="text-blue-700 text-lg font-semibold hover:text-blue-900 hover:bg-blue-100 px-3 py-1 rounded">
                    Dashboard
                </Link>
                {/* <Link to="/delivery" className="text-blue-700 text-lg font-semibold hover:text-blue-900 hover:bg-blue-100 px-3 py-1 rounded">
                    Delivery Challan
                </Link> */}
            </div>

            {/* RIGHT: Auth */}
            <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">👤 Jenish</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
