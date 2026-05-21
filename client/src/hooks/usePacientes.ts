import { useState, useCallback } from 'react';
import apiService from '@/services/api';
import { toast } from 'sonner';

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  genero: 'M' | 'F' | 'O';
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  status: 'ativo' | 'internado' | 'alta' | 'óbito';
  leito?: string;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PacientesResponse {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: Paciente[];
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchPacientes = useCallback(async (page = 1, limit = 10, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getPacientes(page, limit, filters);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao carregar pacientes');
      } else if (response.data) {
        setPacientes(response.data.data);
        setPagination({
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          pages: response.data.pages,
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaciente = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getPaciente(id);
      if (response.error) {
        setError(response.error);
        return null;
      }
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPaciente = useCallback(async (data: Omit<Paciente, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.createPaciente(data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao criar paciente');
        return null;
      }
      toast.success('Paciente criado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao criar paciente');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaciente = useCallback(async (id: number, data: Partial<Paciente>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.updatePaciente(id, data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao atualizar paciente');
        return null;
      }
      toast.success('Paciente atualizado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao atualizar paciente');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePaciente = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.deletePaciente(id);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao deletar paciente');
        return false;
      }
      toast.success('Paciente deletado com sucesso');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao deletar paciente');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pacientes,
    loading,
    error,
    pagination,
    fetchPacientes,
    getPaciente,
    createPaciente,
    updatePaciente,
    deletePaciente,
  };
}
