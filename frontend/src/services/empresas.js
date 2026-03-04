import api from '../libs/axios';

export const empresasService = {
  getCompanies: async (categoryId = null) => {
    const params = categoryId ? { category_id: categoryId } : {};
    const { data } = await api.get('/auth/companies/', { params });
    return data;
  },

  getCategories: async () => {
    const { data } = await api.get('/common/categories/');
    return data;
  },
};
