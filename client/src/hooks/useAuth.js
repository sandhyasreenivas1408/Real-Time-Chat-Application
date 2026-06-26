import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { authAPI } from '../api/client';

export const useAuth = () => {
  const auth = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        auth.restoreAuth();
        if (auth.token) {
          const user = await authAPI.getCurrentUser();
          auth.setUser(user.data);
        }
      } catch (error) {
        console.error('Auth restoration failed:', error);
        auth.logout();
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  return { ...auth, loading };
};