import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://full-stack-blog-application-so7c.onrender.com/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status !== 200) {
      alert('Registration failed');
    } else {
      alert('Registration successful');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
        <Link to="/" className="text-center font-bold text-4xl bg-gradient-to-r pb-3 from-gradient-blue-start to-gradient-blue-end text-transparent bg-clip-text">
        <h1 className="text-5xl font-extrabold tracking-tight  sm:text-6xl lg:text-7xl flex gap-4 flex-col">
              Thoughts
            </h1>
          </Link>
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
            Hello!! Let's start 👋
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
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Login to your account
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 lg:h-90 bg-cover bg-center">
        <img src="signin.svg"/>
      </div>
    </div>
  );
}
