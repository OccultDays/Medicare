import { Router, Response } from 'express';
import { Prontuario } from '../models/Prontuario';
import { Paciente } from '../models/Paciente';
import { authMiddleware, AuthRequest } from '../utils/auth';

const router = Router();

/**
 * GET /api/prontuarios
 * Lista todos os prontuários com paginação e filtros
 */
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, pacienteId } = req.query;
    const offset = ((Number(page) - 1) * Number(limit)) || 0;

    const where: any = {};
    if (pacienteId) where.pacienteId = pacienteId;

    const { count, rows } = await Prontuario.findAndCountAll({
      where,
      include: [{ model: Paciente, as: 'paciente', attributes: ['id', 'nome', 'cpf'] }],
      limit: Number(limit),
      offset,
      order: [['dataAtendimento', 'DESC']],
    });

    res.json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
      data: rows,
    });
  } catch (error) {
    console.error('Erro ao listar prontuários:', error);
    res.status(500).json({ error: 'Erro ao listar prontuários' });
  }
});

/**
 * GET /api/prontuarios/:id
 * Obtém detalhes de um prontuário específico
 */
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prontuario = await Prontuario.findByPk(id, {
      include: [{ model: Paciente, as: 'paciente' }],
    });

    if (!prontuario) {
      res.status(404).json({ error: 'Prontuário não encontrado' });
      return;
    }

    res.json(prontuario);
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
    res.status(500).json({ error: 'Erro ao buscar prontuário' });
  }
});

/**
 * GET /api/prontuarios/paciente/:pacienteId
 * Obtém todos os prontuários de um paciente
 */
router.get('/paciente/:pacienteId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { pacienteId } = req.params;

    const prontuarios = await Prontuario.findAll({
      where: { pacienteId },
      include: [{ model: Paciente, as: 'paciente' }],
      order: [['dataAtendimento', 'DESC']],
    });

    res.json(prontuarios);
  } catch (error) {
    console.error('Erro ao buscar prontuários do paciente:', error);
    res.status(500).json({ error: 'Erro ao buscar prontuários do paciente' });
  }
});

/**
 * POST /api/prontuarios
 * Cria um novo prontuário
 */
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { pacienteId, queixa, historico, diagnostico, medicamentos, examesSolicitados, condutaClinica, medicoResponsavel } = req.body;

    if (!pacienteId || !queixa || !medicoResponsavel) {
      res.status(400).json({ error: 'PacienteId, queixa e medicoResponsavel são obrigatórios' });
      return;
    }

    // Verificar se paciente existe
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      res.status(400).json({ error: 'Paciente não encontrado' });
      return;
    }

    const prontuario = await Prontuario.create({
      pacienteId,
      queixa,
      historico,
      diagnostico,
      medicamentos: medicamentos ? JSON.stringify(medicamentos) : null,
      examesSolicitados: examesSolicitados ? JSON.stringify(examesSolicitados) : null,
      condutaClinica,
      medicoResponsavel,
    });

    const prontuarioComDados = await Prontuario.findByPk(prontuario.id, {
      include: [{ model: Paciente, as: 'paciente' }],
    });

    res.status(201).json(prontuarioComDados);
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    res.status(500).json({ error: 'Erro ao criar prontuário' });
  }
});

/**
 * PUT /api/prontuarios/:id
 * Atualiza um prontuário existente
 */
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prontuario = await Prontuario.findByPk(id);

    if (!prontuario) {
      res.status(404).json({ error: 'Prontuário não encontrado' });
      return;
    }

    // Se medicamentos ou exames forem enviados como array, converter para JSON
    const updateData = { ...req.body };
    if (Array.isArray(updateData.medicamentos)) {
      updateData.medicamentos = JSON.stringify(updateData.medicamentos);
    }
    if (Array.isArray(updateData.examesSolicitados)) {
      updateData.examesSolicitados = JSON.stringify(updateData.examesSolicitados);
    }

    await prontuario.update(updateData);

    const prontuarioAtualizado = await Prontuario.findByPk(id, {
      include: [{ model: Paciente, as: 'paciente' }],
    });

    res.json(prontuarioAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar prontuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar prontuário' });
  }
});

/**
 * DELETE /api/prontuarios/:id
 * Deleta um prontuário
 */
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prontuario = await Prontuario.findByPk(id);

    if (!prontuario) {
      res.status(404).json({ error: 'Prontuário não encontrado' });
      return;
    }

    await prontuario.destroy();
    res.json({ message: 'Prontuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar prontuário:', error);
    res.status(500).json({ error: 'Erro ao deletar prontuário' });
  }
});

export default router;
