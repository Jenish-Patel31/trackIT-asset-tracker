// Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center bg-white shadow-md p-4 mb-5 rounded-md">
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2">
                <Link to="/">
                    <img src="/trackIT.png" alt="AIVID Logo" className="h-9" />
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
            {/* <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">👤 Jenish</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Logout
                </button>
            </div> */}

            {/* RIGHT: User Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 focus:outline-none"
                >
                    {/* 
        <img
            src="/avatar.png"
            alt="User"
            className="w-8 h-8 rounded-full"
        />
        */}
                    <span className="text-gray-700 font-medium hidden sm:block">
                        👤 {localStorage.getItem('username') || 'User'}
                    </span>
                </button>

                {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded z-10">
                        {/* <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link> */}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
