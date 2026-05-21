import { useState, useCallback } from 'react';
import apiService from '@/services/api';
import { toast } from 'sonner';

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  email?: string;
  disponibilidade: 'disponivel' | 'ocupado' | 'indisponivel';
  consultorioNumero?: string;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicosResponse {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: Medico[];
}

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchMedicos = useCallback(async (page = 1, limit = 10, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getMedicos(page, limit, filters);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao carregar médicos');
      } else if (response.data) {
        setMedicos(response.data.data);
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
      toast.error('Erro ao carregar médicos');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMedico = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getMedico(id);
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

  const createMedico = useCallback(async (data: Omit<Medico, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.createMedico(data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao criar médico');
        return null;
      }
      toast.success('Médico criado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao criar médico');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMedico = useCallback(async (id: number, data: Partial<Medico>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.updateMedico(id, data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao atualizar médico');
        return null;
      }
      toast.success('Médico atualizado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao atualizar médico');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMedico = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.deleteMedico(id);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao deletar médico');
        return false;
      }
      toast.success('Médico deletado com sucesso');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao deletar médico');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    medicos,
    loading,
    error,
    pagination,
    fetchMedicos,
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico,
  };
}
