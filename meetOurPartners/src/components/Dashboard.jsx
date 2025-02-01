import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-400 via-green-300 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 mb-6">
            You are successfully logged in to your account.
          </p>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">User Code:</span> {user?.userCode}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> {user?.roles}
              </p>
            </div>
          </div>
          <div className="mt-8 space-x-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to Home
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
