import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';
const JWT_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '7d';

export interface JwtPayload {
  id: number;
  email: string;
  role: 'admin' | 'medico' | 'enfermeiro';
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

/**
 * Gera um token JWT de acesso
 */
export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

/**
 * Gera um token JWT de refresh
 */
export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
}

/**
 * Verifica e decodifica um token JWT de acesso
 */
export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Verifica e decodifica um token JWT de refresh
 */
export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Middleware para autenticação JWT
 */
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }

  req.user = decoded;
  next();
}

/**
 * Middleware para verificar se o usuário é administrador
 */
export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    return;
  }

  next();
}

/**
 * Middleware para verificar se o usuário é médico ou administrador
 */
export function medicoMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user || (req.user.role !== 'medico' && req.user.role !== 'admin')) {
    res.status(403).json({ error: 'Acesso negado. Apenas médicos e administradores.' });
    return;
  }

  next();
}
