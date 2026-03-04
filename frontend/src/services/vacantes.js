import api from '../libs/axios';

export const VACANCY_TYPES = [
  { value: 'full_time', label: 'Tiempo Completo' },
  { value: 'part_time', label: 'Medio Tiempo' },
  { value: 'internship', label: 'Práctica' },
  { value: 'contract', label: 'Contrato' },
];

export const vacantesService = {
  getVacancies: async ({ type = null, categoryId = null } = {}) => {
    const params = {};
    if (type) params.type = type;
    if (categoryId) params.category = categoryId;
    const { data } = await api.get('/vacancies/', { params });
    return data;
  },

  getCategories: async () => {
    const { data } = await api.get('/common/categories/');
    return data;
  },
};
