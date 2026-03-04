import api from '../libs/axios';

const ENDPOINTS = {
  user: '/profiles/user/',
  company: '/profiles/company/',
  institution: '/profiles/institution/',
};

export const profileService = {
  get: async (entityType) => {
    const { data } = await api.get(ENDPOINTS[entityType]);
    return data;
  },

  update: async (entityType, payload) => {
    const { data } = await api.patch(ENDPOINTS[entityType], payload);
    return data;
  },

  uploadAvatar: async (file) => {
    const form = new FormData();
    form.append('avatar', file);
    const { data } = await api.post('/profiles/avatar/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
