/**
 * Configuração da API
 * Define a URL base da API baseado no ambiente
 */

export const API_CONFIG = {
  // URL base da API
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

  // Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      me: '/auth/me',
      register: '/auth/register',
    },
    pacientes: '/pacientes',
    medicos: '/medicos',
    consultas: '/consultas',
    prontuarios: '/prontuarios',
  },

  // Timeouts
  timeout: 30000,

  // Retry config
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
  },
};

export default API_CONFIG;
