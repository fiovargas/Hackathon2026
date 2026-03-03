import api from '../libs/axios'

export const auth = {
  login: async (data) => {
    const response = await api.post('/auth/login/', data);
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout/');
  },
  getUser: async () => {
    const response = await api.get('/auth/me/');
    return response.data;
  },
};