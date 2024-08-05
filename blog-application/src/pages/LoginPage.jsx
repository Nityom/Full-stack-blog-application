import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch('https://full-stack-blog-application-api.vercel.app', {
        method: 'POST',
        headers: {         'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        setUserInfo(data);
        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);

    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className="hidden lg:flex lg:w-1/2 lg:h-90 bg-cover bg-center" style={{ backgroundImage: "url('/login.svg')" }}>
        {/* Company image on the left side */}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Link to="/" className="text-5xl font-extrabold sm:text-6xl lg:text-7xl pb-3 tracking-tight text-center bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end text-transparent bg-clip-text">
            Thoughts
          </Link>
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
            Welcome Back! Let's Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
