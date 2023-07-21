import { useEffect } from 'react';
import Loader from './Loader';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

export default function Signout() {
  const { setIsSignedIn } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      try {
        const { data } = await axios.post('/api/logout');
        sessionStorage.clear();
        setIsSignedIn(false);
      } catch (er) {
        console.log('something went wrong');
      } finally {
        navigate('/');
      }
    }
    logout();
  }, []);
  return <Loader />;
}
