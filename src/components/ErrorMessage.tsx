import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mb-4 flex items-center p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
      <AlertCircle size={18} className="flex-shrink-0 mr-2" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;