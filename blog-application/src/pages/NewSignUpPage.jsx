import React from 'react';
import { Link } from 'react-router-dom'; // Use 'react-router-dom' for routing in ReactJS

export default function NewSignUpPage() {
  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2 bg-gray-900 text-gray-100">
      <div className=" flex flex-col items-center justify-center">
        <img
          src="/signin.svg"
          alt="Authentication Illustration"
          className="object-cover"
          width={600}
          height={500}
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-400">Enter your credentials to access your account.</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <Link
                  to="#"
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 p-2 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
