import { Router, Response } from 'express';
import { Medico } from '../models/Medico';
import { authMiddleware, AuthRequest } from '../utils/auth';

const router = Router();

/**
 * GET /api/medicos
 * Lista todos os médicos com filtros
 */
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, especialidade, disponibilidade, search } = req.query;
    const offset = ((Number(page) - 1) * Number(limit)) || 0;

    const where: any = {};
    if (especialidade) where.especialidade = especialidade;
    if (disponibilidade) where.disponibilidade = disponibilidade;
    if (search) {
      where.nome = {
        [require('sequelize').Op.iLike]: `%${search}%`,
      };
    }

    const { count, rows } = await Medico.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['nome', 'ASC']],
    });

    res.json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
      data: rows,
    });
  } catch (error) {
    console.error('Erro ao listar médicos:', error);
    res.status(500).json({ error: 'Erro ao listar médicos' });
  }
});

/**
 * GET /api/medicos/:id
 * Obtém detalhes de um médico específico
 */
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findByPk(id);

    if (!medico) {
      res.status(404).json({ error: 'Médico não encontrado' });
      return;
    }

    res.json(medico);
  } catch (error) {
    console.error('Erro ao buscar médico:', error);
    res.status(500).json({ error: 'Erro ao buscar médico' });
  }
});

/**
 * POST /api/medicos
 * Cria um novo médico
 */
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, crm, especialidade, telefone, email, consultorioNumero } = req.body;

    if (!nome || !crm || !especialidade) {
      res.status(400).json({ error: 'Nome, CRM e especialidade são obrigatórios' });
      return;
    }

    const existingMedico = await Medico.findOne({ where: { crm } });
    if (existingMedico) {
      res.status(400).json({ error: 'Médico com este CRM já existe' });
      return;
    }

    const medico = await Medico.create({
      nome,
      crm,
      especialidade,
      telefone,
      email,
      consultorioNumero,
      disponibilidade: 'disponivel',
    });

    res.status(201).json(medico);
  } catch (error) {
    console.error('Erro ao criar médico:', error);
    res.status(500).json({ error: 'Erro ao criar médico' });
  }
});

/**
 * PUT /api/medicos/:id
 * Atualiza um médico existente
 */
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findByPk(id);

    if (!medico) {
      res.status(404).json({ error: 'Médico não encontrado' });
      return;
    }

    await medico.update(req.body);
    res.json(medico);
  } catch (error) {
    console.error('Erro ao atualizar médico:', error);
    res.status(500).json({ error: 'Erro ao atualizar médico' });
  }
});

/**
 * DELETE /api/medicos/:id
 * Deleta um médico
 */
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findByPk(id);

    if (!medico) {
      res.status(404).json({ error: 'Médico não encontrado' });
      return;
    }

    await medico.destroy();
    res.json({ message: 'Médico deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar médico:', error);
    res.status(500).json({ error: 'Erro ao deletar médico' });
  }
});

export default router;
