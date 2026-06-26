import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import { SocketProvider } from './context/SocketContext';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import './index.css';

function App() {
  const { restoreAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  return (
    <Router>
      {isAuthenticated ? (
        <SocketProvider>
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </Routes>
        </SocketProvider>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
