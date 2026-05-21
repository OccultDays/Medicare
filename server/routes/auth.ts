import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, authMiddleware, AuthRequest } from '../utils/auth';

const router = Router();

/**
 * POST /api/auth/login
 * Autentica um usuário e retorna tokens JWT
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios' });
      return;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Email ou senha inválidos' });
      return;
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Email ou senha inválidos' });
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

/**
 * POST /api/auth/refresh
 * Renova o token de acesso usando o refresh token
 */
router.post('/refresh', (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: 'Refresh token não fornecido' });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      res.status(401).json({ error: 'Refresh token inválido ou expirado' });
      return;
    }

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(500).json({ error: 'Erro ao renovar token' });
  }
});

/**
 * POST /api/auth/logout
 * Faz logout do usuário (apenas remove o token no cliente)
 */
router.post('/logout', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ message: 'Logout realizado com sucesso' });
});

/**
 * GET /api/auth/me
 * Retorna os dados do usuário autenticado
 */
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

/**
 * POST /api/auth/register
 * Registra um novo usuário (apenas para administradores)
 */
router.post('/register', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Apenas administradores podem criar novos usuários
    if (req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Apenas administradores podem criar usuários' });
      return;
    }

    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: 'Email já cadastrado' });
      return;
    }

    const user = await User.create({
      email,
      password,
      name,
      role: role || 'enfermeiro',
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

export default router;
