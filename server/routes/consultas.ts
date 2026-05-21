import { Router, Response } from 'express';
import { Consulta } from '../models/Consulta';
import { Paciente } from '../models/Paciente';
import { Medico } from '../models/Medico';
import { authMiddleware, AuthRequest } from '../utils/auth';

const router = Router();

/**
 * GET /api/consultas
 * Lista todas as consultas com paginação e filtros
 */
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status, tipo, pacienteId, medicoId } = req.query;
    const offset = ((Number(page) - 1) * Number(limit)) || 0;

    const where: any = {};
    if (status) where.status = status;
    if (tipo) where.tipo = tipo;
    if (pacienteId) where.pacienteId = pacienteId;
    if (medicoId) where.medicoId = medicoId;

    const { count, rows } = await Consulta.findAndCountAll({
      where,
      include: [
        { model: Paciente, as: 'paciente', attributes: ['id', 'nome', 'cpf'] },
        { model: Medico, as: 'medico', attributes: ['id', 'nome', 'especialidade'] },
      ],
      limit: Number(limit),
      offset,
      order: [['dataHora', 'DESC']],
    });

    res.json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
      data: rows,
    });
  } catch (error) {
    console.error('Erro ao listar consultas:', error);
    res.status(500).json({ error: 'Erro ao listar consultas' });
  }
});

/**
 * GET /api/consultas/:id
 * Obtém detalhes de uma consulta específica
 */
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const consulta = await Consulta.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Medico, as: 'medico' },
      ],
    });

    if (!consulta) {
      res.status(404).json({ error: 'Consulta não encontrada' });
      return;
    }

    res.json(consulta);
  } catch (error) {
    console.error('Erro ao buscar consulta:', error);
    res.status(500).json({ error: 'Erro ao buscar consulta' });
  }
});

/**
 * POST /api/consultas
 * Cria uma nova consulta
 */
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { pacienteId, medicoId, dataHora, tipo, motivo } = req.body;

    if (!pacienteId || !medicoId || !dataHora || !motivo) {
      res.status(400).json({ error: 'PacienteId, medicoId, dataHora e motivo são obrigatórios' });
      return;
    }

    // Verificar se paciente e médico existem
    const paciente = await Paciente.findByPk(pacienteId);
    const medico = await Medico.findByPk(medicoId);

    if (!paciente || !medico) {
      res.status(400).json({ error: 'Paciente ou médico não encontrado' });
      return;
    }

    const consulta = await Consulta.create({
      pacienteId,
      medicoId,
      dataHora,
      tipo: tipo || 'presencial',
      motivo,
      status: 'agendada',
    });

    const consultaComDados = await Consulta.findByPk(consulta.id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Medico, as: 'medico' },
      ],
    });

    res.status(201).json(consultaComDados);
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: 'Erro ao criar consulta' });
  }
});

/**
 * PUT /api/consultas/:id
 * Atualiza uma consulta existente
 */
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const consulta = await Consulta.findByPk(id);

    if (!consulta) {
      res.status(404).json({ error: 'Consulta não encontrada' });
      return;
    }

    await consulta.update(req.body);

    const consultaAtualizada = await Consulta.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Medico, as: 'medico' },
      ],
    });

    res.json(consultaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    res.status(500).json({ error: 'Erro ao atualizar consulta' });
  }
});

/**
 * DELETE /api/consultas/:id
 * Deleta uma consulta
 */
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const consulta = await Consulta.findByPk(id);

    if (!consulta) {
      res.status(404).json({ error: 'Consulta não encontrada' });
      return;
    }

    await consulta.destroy();
    res.json({ message: 'Consulta deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar consulta:', error);
    res.status(500).json({ error: 'Erro ao deletar consulta' });
  }
});

export default router;
