import { Router, Response } from 'express';
import { Paciente } from '../models/Paciente';
import { authMiddleware, AuthRequest } from '../utils/auth';

const router = Router();

/**
 * GET /api/pacientes
 * Lista todos os pacientes com paginação e filtros
 */
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = ((Number(page) - 1) * Number(limit)) || 0;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.nome = {
        [require('sequelize').Op.iLike]: `%${search}%`,
      };
    }

    const { count, rows } = await Paciente.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
      data: rows,
    });
  } catch (error) {
    console.error('Erro ao listar pacientes:', error);
    res.status(500).json({ error: 'Erro ao listar pacientes' });
  }
});

/**
 * GET /api/pacientes/:id
 * Obtém detalhes de um paciente específico
 */
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      res.status(404).json({ error: 'Paciente não encontrado' });
      return;
    }

    res.json(paciente);
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ error: 'Erro ao buscar paciente' });
  }
});

/**
 * POST /api/pacientes
 * Cria um novo paciente
 */
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, cpf, dataNascimento, genero, telefone, email, endereco, cidade, estado, cep } = req.body;

    if (!nome || !cpf || !dataNascimento || !genero) {
      res.status(400).json({ error: 'Nome, CPF, data de nascimento e gênero são obrigatórios' });
      return;
    }

    const existingPaciente = await Paciente.findOne({ where: { cpf } });
    if (existingPaciente) {
      res.status(400).json({ error: 'Paciente com este CPF já existe' });
      return;
    }

    const paciente = await Paciente.create({
      nome,
      cpf,
      dataNascimento,
      genero,
      telefone,
      email,
      endereco,
      cidade,
      estado,
      cep,
      status: 'ativo',
    });

    res.status(201).json(paciente);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ error: 'Erro ao criar paciente' });
  }
});

/**
 * PUT /api/pacientes/:id
 * Atualiza um paciente existente
 */
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      res.status(404).json({ error: 'Paciente não encontrado' });
      return;
    }

    await paciente.update(req.body);
    res.json(paciente);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ error: 'Erro ao atualizar paciente' });
  }
});

/**
 * DELETE /api/pacientes/:id
 * Deleta um paciente
 */
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      res.status(404).json({ error: 'Paciente não encontrado' });
      return;
    }

    await paciente.destroy();
    res.json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    res.status(500).json({ error: 'Erro ao deletar paciente' });
  }
});

export default router;
