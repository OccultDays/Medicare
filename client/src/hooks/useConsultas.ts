import { useState, useCallback } from 'react';
import apiService from '@/services/api';
import { toast } from 'sonner';

export interface Consulta {
  id: number;
  pacienteId: number;
  medicoId: number;
  dataHora: string;
  tipo: 'presencial' | 'teleconsulta' | 'retorno';
  motivo: string;
  status: 'agendada' | 'realizada' | 'cancelada' | 'ausente';
  anotacoes?: string;
  prescricao?: string;
  createdAt: string;
  updatedAt: string;
  paciente?: {
    id: number;
    nome: string;
    cpf: string;
  };
  medico?: {
    id: number;
    nome: string;
    especialidade: string;
  };
}

export interface ConsultasResponse {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: Consulta[];
}

export function useConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchConsultas = useCallback(async (page = 1, limit = 10, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getConsultas(page, limit, filters);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao carregar consultas');
      } else if (response.data) {
        setConsultas(response.data.data);
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
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  }, []);

  const getConsulta = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getConsulta(id);
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

  const createConsulta = useCallback(async (data: Omit<Consulta, 'id' | 'createdAt' | 'updatedAt' | 'paciente' | 'medico'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.createConsulta(data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao criar consulta');
        return null;
      }
      toast.success('Consulta criada com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao criar consulta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConsulta = useCallback(async (id: number, data: Partial<Consulta>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.updateConsulta(id, data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao atualizar consulta');
        return null;
      }
      toast.success('Consulta atualizada com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao atualizar consulta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteConsulta = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.deleteConsulta(id);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao deletar consulta');
        return false;
      }
      toast.success('Consulta deletada com sucesso');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao deletar consulta');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    consultas,
    loading,
    error,
    pagination,
    fetchConsultas,
    getConsulta,
    createConsulta,
    updateConsulta,
    deleteConsulta,
  };
}
