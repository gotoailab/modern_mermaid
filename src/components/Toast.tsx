import React, { useEffect, useState } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000, type = 'success' }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 200); // 等待退出动画完成
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500 dark:text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 dark:text-red-400" />;
      case 'info':
        return <Info className="w-5 h-5 flex-shrink-0 text-blue-500 dark:text-blue-400" />;
      default:
        return <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500 dark:text-green-400" />;
    }
  };

  return (
    <div className="fixed top-4 left-1/2 z-[9999]" style={{ transform: 'translateX(-50%)' }}>
      <div className={`bg-white dark:bg-gray-800 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 border border-gray-200 dark:border-gray-700 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md ${isExiting ? 'animate-fade-out' : 'animate-slide-down'}`}>
        {getIcon()}
        <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{message}</span>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

