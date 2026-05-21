import { useState, useCallback } from 'react';
import apiService from '@/services/api';
import { toast } from 'sonner';

export interface Prontuario {
  id: number;
  pacienteId: number;
  dataAtendimento: string;
  queixa: string;
  historico?: string;
  diagnostico?: string;
  medicamentos?: string;
  examesSolicitados?: string;
  condutaClinica?: string;
  medicoResponsavel: string;
  createdAt: string;
  updatedAt: string;
  paciente?: {
    id: number;
    nome: string;
    cpf: string;
  };
}

export interface ProntuariosResponse {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: Prontuario[];
}

export function useProntuarios() {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchProntuarios = useCallback(async (page = 1, limit = 10, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getProntuarios(page, limit, filters);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao carregar prontuários');
      } else if (response.data) {
        setProntuarios(response.data.data);
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
      toast.error('Erro ao carregar prontuários');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProntuario = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getProntuario(id);
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

  const getProntuariosPaciente = useCallback(async (pacienteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getProntuariosPaciente(pacienteId);
      if (response.error) {
        setError(response.error);
        return [];
      }
      return response.data || [];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createProntuario = useCallback(async (data: Omit<Prontuario, 'id' | 'createdAt' | 'updatedAt' | 'paciente'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.createProntuario(data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao criar prontuário');
        return null;
      }
      toast.success('Prontuário criado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao criar prontuário');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProntuario = useCallback(async (id: number, data: Partial<Prontuario>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.updateProntuario(id, data);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao atualizar prontuário');
        return null;
      }
      toast.success('Prontuário atualizado com sucesso');
      return response.data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao atualizar prontuário');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProntuario = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.deleteProntuario(id);
      if (response.error) {
        setError(response.error);
        toast.error('Erro ao deletar prontuário');
        return false;
      }
      toast.success('Prontuário deletado com sucesso');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      toast.error('Erro ao deletar prontuário');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    prontuarios,
    loading,
    error,
    pagination,
    fetchProntuarios,
    getProntuario,
    getProntuariosPaciente,
    createProntuario,
    updateProntuario,
    deleteProntuario,
  };
}
