import { useEffect } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

// check if user is logged in and redirect to dashboard if true
const useSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.get('/auth/login');

        if (response.status === 200) {
          navigate('/dashboard');
        }
      } catch (error) {
        return;
      }
    })();
  }, [navigate]);
};
export default useSession;
