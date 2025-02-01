import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgeSelection = () => {
  const navigate = useNavigate();

  const handleAgeSelection = (isAbove16) => {
    navigate(isAbove16 ? '/register/above16' : '/register/below16');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-400 via-green-300 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-green-500 text-white">
          <h1 className="text-3xl font-bold text-center">Welcome!</h1>
          <p className="text-center mt-2 text-green-50">Please select your age group to continue</p>
        </div>

        <div className="p-8 space-y-6">
          <button
            onClick={() => handleAgeSelection(true)}
            className="w-full p-4 bg-white border-2 border-green-500 rounded-xl text-green-600 font-semibold hover:bg-green-50 transition-colors duration-200 flex items-center justify-between group"
          >
            <span className="text-lg">I am Above 16</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={() => handleAgeSelection(false)}
            className="w-full p-4 bg-green-500 rounded-xl text-white font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-between group"
          >
            <span className="text-lg">I am Below 16</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeSelection;
