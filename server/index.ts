import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';

// Import routes
import authRoutes from './routes/auth';
import pacientesRoutes from './routes/pacientes';
import medicosRoutes from './routes/medicos';
import consultasRoutes from './routes/consultas';
import prontuariosRoutes from './routes/prontuarios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Sincronizar banco de dados
  try {
    await sequelize.authenticate();
    console.log('✓ Conexão com banco de dados estabelecida');
    
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✓ Modelos sincronizados com banco de dados');
  } catch (error) {
    console.error('✗ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/pacientes', pacientesRoutes);
  app.use('/api/medicos', medicosRoutes);
  app.use('/api/consultas', consultasRoutes);
  app.use('/api/prontuarios', prontuariosRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`\n🚀 Servidor rodando em http://localhost:${port}/`);
    console.log(`📚 API disponível em http://localhost:${port}/api/`);
    console.log(`🏥 MediCare - Sistema de Gestão Hospitalar\n`);
  });
}

startServer().catch(console.error);
