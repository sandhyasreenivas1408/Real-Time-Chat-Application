import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type];

  const Icon = {
    error: AlertCircle,
    success: CheckCircle,
    info: Info,
    warning: AlertCircle
  }[type];

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto font-bold">
        ×
      </button>
    </div>
  );
};

export default Toast;