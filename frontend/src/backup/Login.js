import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleView = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const endpoint = isLogin ? 'login' : 'register';
            const payload = isLogin
                ? { usernameOremail: formData.username, password: formData.password }
                : formData;

            const res = await axios.post(`http://localhost:4000/api/${endpoint}`, payload);
            const { token, user } = res.data;

            if (isLogin) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
            } else {
                setIsLogin(true); // go to login after successful signup
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-md transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-800">
                    {isLogin ? '🚀 Login to AIVID' : '🎉 Sign up for AIVID'}
                </h2>

                {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

                {!isLogin && (
                    <>
                        <FloatingInput name="firstName" label="First Name" onChange={handleChange} />
                        <FloatingInput name="email" label="Email" onChange={handleChange} />
                    </>
                )}
                <FloatingInput name="username" label="Username or Email" onChange={handleChange} />
                <FloatingPasswordInput
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
                {!isLogin && (
                    <FloatingPasswordInput
                        name="confirmPassword"
                        label="Confirm Password"
                        onChange={handleChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl mt-4 transition-all"
                >
                    {isLogin ? '🔐 Login' : '📝 Sign Up'}
                </button>

                <div className="flex items-center justify-center gap-3 mt-5">
                    <FaGoogle className="text-xl hover:text-red-500 cursor-pointer" />
                    <FaGithub className="text-xl hover:text-black cursor-pointer" />
                </div>

                <p className="text-center text-sm mt-5">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={toggleView}
                        className="text-blue-600 hover:underline transition-all"
                    >
                        {isLogin ? 'Sign up here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    );
}

const FloatingInput = ({ name, label, onChange }) => (
    <div className="relative mb-5">
        <input
            name={name}
            type="text"
            onChange={onChange}
            placeholder=" "
            className="peer w-full px-3 py-2 border border-gray-300 rounded-md bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label
            htmlFor={name}
            className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600"
        >
            {label}
        </label>
    </div>
);

const FloatingPasswordInput = ({ name, label, onChange, showPassword, setShowPassword }) => (
    <div className="relative mb-5">
        <input
            name={name}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            placeholder=" "
            className="peer w-full px-3 py-2 border border-gray-300 rounded-md bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label
            htmlFor={name}
            className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600"
        >
            {label}
        </label>
        <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
    </div>
);

export default LoginSignup;
