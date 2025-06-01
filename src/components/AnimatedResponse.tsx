
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, User } from 'lucide-react';

const AnimatedResponse = ({ result }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { recognized, student, status, timestamp } = result;

  return (
    <div className={`transition-all duration-500 transform ${
      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
    }`}>
      <div className="text-center p-6">
        {recognized ? (
          <>
            {/* Success Animation */}
            <div className="mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-75"></div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Welcome, {student.name}! 🎉
              </h3>
              <p className="text-green-600 text-lg mb-4">
                Attendance marked successfully
              </p>
              <div className="flex items-center justify-center gap-2 text-green-700">
                <User className="w-5 h-5" />
                <span className="font-semibold">{status}</span>
                <span>•</span>
                <span>{new Date(timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Failure Animation */}
            <div className="mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full mx-auto animate-ping opacity-75"></div>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-2">
                Face Not Recognized 😔
              </h3>
              <p className="text-red-600 text-lg mb-4">
                Please try again or contact your teacher
              </p>
              <div className="flex items-center justify-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Absent</span>
                <span>•</span>
                <span>{new Date(timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimatedResponse;
