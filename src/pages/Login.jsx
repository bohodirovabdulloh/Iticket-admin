import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../redux/authSclice';
import { FaUser, FaLock } from 'react-icons/fa'; 
import { Rings } from 'react-loader-spinner'; 

const Login = () => {
  const store = useSelector((store) => store);
  console.log(store);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('https://admin-dash-oil-trade.onrender.com/api/v1/admin/login', {
        username: username,
        password,
      });

      if (response.data.admin) {
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        dispatch(login()); // Ensure this updates the isAuthenticated state
        navigate('/app/home');
      } else {
        setError('Неверное имя или пароль');
      }
    } catch (error) {
      setError('Ошибка при попытке входа');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
      <div className="bg-white bg-opacity-80 p-10 rounded-3xl shadow-2xl w-96 md:w-1/3 lg:w-1/4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Вход в панель администратора</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        
        {loading && (
          <div className="flex justify-center mb-4">
            <Rings color="#00BFFF" height={50} width={50} />
          </div>
        )}

        <div className="mb-6 relative">
          <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя"
            required
            className="border rounded-full p-4 pl-12 w-full text-red-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="border rounded-full p-4 pl-12 w-full text-red-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          className={`bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-4 px-6 rounded-full w-full shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        
      </div>
    </div>
  );
};

export default Login;
