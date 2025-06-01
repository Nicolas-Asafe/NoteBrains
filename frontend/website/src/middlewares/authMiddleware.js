import Cookies from 'js-cookie';

export const authMiddleware = () => {
  const token = Cookies.get('token');
  return !!token;
}