
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';

const AnimatedResponse = ({ result }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { recognized, student, status, timestamp, message } = result;

  const getStatusConfig = () => {
    if (status === 'Image Not Clear') {
      return {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-500',
        titleColor: 'text-yellow-800',
        textColor: 'text-yellow-600',
        statusColor: 'text-yellow-700',
        animationColor: 'bg-yellow-200',
        title: 'Image Quality Issue 📸',
        animation: 'animate-pulse'
      };
    } else if (recognized) {
      return {
        icon: CheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-500',
        titleColor: 'text-green-800',
        textColor: 'text-green-600',
        statusColor: 'text-green-700',
        animationColor: 'bg-green-200',
        title: `Welcome, ${student.name}! 🎉`,
        animation: 'animate-bounce'
      };
    } else {
      return {
        icon: XCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-500',
        titleColor: 'text-red-800',
        textColor: 'text-red-600',
        statusColor: 'text-red-700',
        animationColor: 'bg-red-200',
        title: 'Face Not Recognized 😔',
        animation: 'animate-pulse'
      };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`transition-all duration-500 transform ${
      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
    }`}>
      <div className="text-center p-6">
        {/* Animation */}
        <div className="mb-6">
          <div className="relative">
            <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${config.animation}`}>
              <IconComponent className={`w-12 h-12 ${config.iconColor}`} />
            </div>
            <div className={`absolute inset-0 w-24 h-24 ${config.animationColor} rounded-full mx-auto animate-ping opacity-75`}></div>
          </div>
        </div>

        <div className={`${config.bgColor} rounded-2xl p-6 ${config.borderColor} border`}>
          <h3 className={`text-2xl font-bold ${config.titleColor} mb-2`}>
            {config.title}
          </h3>
          <p className={`${config.textColor} text-lg mb-4`}>
            {message}
          </p>
          <div className={`flex items-center justify-center gap-2 ${config.statusColor}`}>
            <Eye className="w-5 h-5" />
            <span className="font-semibold">{status}</span>
            <span>•</span>
            <span>{new Date(timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedResponse;
