import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private api: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token às requisições
    this.api.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Interceptor para renovar token se expirado
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && this.refreshToken && originalRequest) {
          try {
            const response = await this.api.post('/auth/refresh', {
              refreshToken: this.refreshToken,
            });

            this.accessToken = response.data.accessToken;
            if (this.accessToken) {
              localStorage.setItem('accessToken', this.accessToken);
            }

            if (originalRequest.headers && this.accessToken) {
              originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            }

            return this.api(originalRequest);
          } catch (refreshError) {
            this.logout();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );

    // Carregar tokens do localStorage
    this.loadTokens();
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  // ============ AUTH ============

  async login(email: string, password: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/auth/login', { email, password });
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;

      if (this.accessToken) localStorage.setItem('accessToken', this.accessToken);
      if (this.refreshToken) localStorage.setItem('refreshToken', this.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }

    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  async getMe(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get('/auth/me');
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============ PACIENTES ============

  async getPacientes(page = 1, limit = 10, filters?: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get('/pacientes', {
        params: { page, limit, ...filters },
      });
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPaciente(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/pacientes/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createPaciente(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/pacientes', data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePaciente(id: number, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.put(`/pacientes/${id}`, data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePaciente(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.delete(`/pacientes/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============ MÉDICOS ============

  async getMedicos(page = 1, limit = 10, filters?: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get('/medicos', {
        params: { page, limit, ...filters },
      });
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMedico(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/medicos/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createMedico(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/medicos', data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateMedico(id: number, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.put(`/medicos/${id}`, data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteMedico(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.delete(`/medicos/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============ CONSULTAS ============

  async getConsultas(page = 1, limit = 10, filters?: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get('/consultas', {
        params: { page, limit, ...filters },
      });
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConsulta(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/consultas/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createConsulta(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/consultas', data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateConsulta(id: number, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.put(`/consultas/${id}`, data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteConsulta(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.delete(`/consultas/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============ PRONTUÁRIOS ============

  async getProntuarios(page = 1, limit = 10, filters?: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get('/prontuarios', {
        params: { page, limit, ...filters },
      });
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProntuario(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/prontuarios/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProntuariosPaciente(pacienteId: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/prontuarios/paciente/${pacienteId}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createProntuario(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/prontuarios', data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProntuario(id: number, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.put(`/prontuarios/${id}`, data);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteProntuario(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.delete(`/prontuarios/${id}`);
      return { data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============ HELPERS ============

  private handleError(error: any): ApiResponse<any> {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || error.message,
      };
    }
    return { error: 'Erro desconhecido' };
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService();
export default apiService;
