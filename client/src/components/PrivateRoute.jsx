import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { useSocket } from '../context/SocketContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { isConnected } = useSocket();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {children}
      {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Reconnecting...
        </div>
      )}
    </>
  );
};

export default PrivateRoute;