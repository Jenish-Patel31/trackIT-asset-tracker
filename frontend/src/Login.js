import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [loginData, setLoginData] = useState({
        usernameOremail: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        firstName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const isLogin = mode === 'login'; //returns true if the login 

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignupInputChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const endpoint = isLogin ? '/api/login' : '/api/register';
            // console.log("Frontend endpoint:", endpoint);

            const payload = isLogin ? loginData : signupData;
            // console.log("Frontend:", payload);
            const res = await axios.post(`https://trackit-asset-tracker.onrender.com${endpoint}`, payload);

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                alert("Login Successful!");
                setLoginData({ usernameOremail: '', password: '' });
                navigate('/dashboard');
            } else {
                alert(res.data.message || "Registration successful! Please login.");
                setSignupData({ username: '', firstName: '', email: '', password: '', confirmPassword: '' });
                setMode('login');
            }

        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6">

                <div className="flex justify-center mb-4">
                    <img src="/assetTracker.png" alt="Logo" className="h-14" />
                </div>

                <div className="flex justify-around mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`w-full py-2 ${isLogin ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`w-full py-2 ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                        Signup
                    </button>
                </div>


                <div className="space-y-3">
                    {isLogin ? (
                        <>
                            <input
                                name="usernameOremail"
                                placeholder="Username or Email"
                                onChange={handleLoginInputChange}
                                value={loginData.usernameOremail}
                                className="input "
                            />
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleLoginInputChange}
                                value={loginData.password}
                                className="input "
                            />
                        </>
                    ) : (
                        <>
                            <input
                                name="firstName"
                                placeholder="First Name"
                                onChange={handleSignupInputChange}
                                value={signupData.firstName}
                                className="input "
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleSignupInputChange}
                                value={signupData.email}
                                className="input"
                            />
                            <input
                                name="username"
                                placeholder="Username"
                                onChange={handleSignupInputChange}
                                value={signupData.username}
                                className="input "
                            />
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleSignupInputChange}
                                value={signupData.password}
                                className="input "
                            />
                            <input
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={handleSignupInputChange}
                                value={signupData.confirmPassword}
                                className="input"
                            />
                        </>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    {isLogin ? 'Login' : 'Signup'}
                </button>
            </div>
        </div>
    );
}

export default Login;
