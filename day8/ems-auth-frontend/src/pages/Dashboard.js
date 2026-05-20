import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const storedUser = localStorage.getItem('user');

  const user =
    storedUser && storedUser !== 'undefined'
      ? JSON.parse(storedUser)
      : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-indigo-600">{user.name}</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your employees and departments efficiently with our system.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link to="/employees" className="transform hover:scale-105 transition-transform">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="text-4xl mb-2">👥</div>
              <h3 className="text-2xl font-bold mb-1">Employees</h3>
              <p className="text-blue-100">Manage employee records</p>
            </div>
          </Link>

          <Link to="/departments" className="transform hover:scale-105 transition-transform">
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="text-4xl mb-2">🏢</div>
              <h3 className="text-2xl font-bold mb-1">Departments</h3>
              <p className="text-green-100">Manage departments</p>
            </div>
          </Link>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-2xl font-bold mb-1">Analytics</h3>
            <p className="text-purple-100">Coming soon</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 font-bold mr-3">✓</span>
                Complete Employee CRUD Operations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 font-bold mr-3">✓</span>
                Department Management System
              </li>
              <li className="flex items-center">
                <span className="text-green-500 font-bold mr-3">✓</span>
                Advanced Search & Filtering
              </li>
              <li className="flex items-center">
                <span className="text-green-500 font-bold mr-3">✓</span>
                Secure Authentication
              </li>
              <li className="flex items-center">
                <span className="text-green-500 font-bold mr-3">✓</span>
                Real-time Data Synchronization
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">1.</span>
                <span>Start by creating departments in the Departments section</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">2.</span>
                <span>Add employees and assign them to departments</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">3.</span>
                <span>Use search and filters to find employees quickly</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">4.</span>
                <span>Edit or delete records as needed</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
