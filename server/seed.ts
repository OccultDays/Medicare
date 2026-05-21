import dotenv from 'dotenv';
import sequelize from './config/database';
import { User } from './models/User';
import { Paciente } from './models/Paciente';
import { Medico } from './models/Medico';
import { Consulta } from './models/Consulta';
import { Prontuario } from './models/Prontuario';

dotenv.config();

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexão com banco de dados estabelecida');

    await sequelize.sync({ force: true });
    console.log('✓ Banco de dados sincronizado');

    // Criar usuários
    const admin = await User.create({
      email: 'admin@medicare.com',
      password: 'admin123',
      name: 'Administrador Sistema',
      role: 'admin',
    });

    const medico1 = await User.create({
      email: 'medico@medicare.com',
      password: 'medico123',
      name: 'Dr. Carlos Mendes',
      role: 'medico',
    });

    const enfermeiro = await User.create({
      email: 'enfermeiro@medicare.com',
      password: 'enf123',
      name: 'Enf. Paula Santos',
      role: 'enfermeiro',
    });

    console.log('✓ Usuários criados');

    // Criar pacientes
    const paciente1 = await Paciente.create({
      nome: 'João Silva Santos',
      cpf: '12345678901',
      dataNascimento: new Date('1980-05-15'),
      genero: 'M',
      telefone: '(11) 98765-4321',
      email: 'joao@email.com',
      endereco: 'Rua A, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310100',
      status: 'internado',
      leito: '301',
    });

    const paciente2 = await Paciente.create({
      nome: 'Maria Oliveira Costa',
      cpf: '98765432109',
      dataNascimento: new Date('1975-03-22'),
      genero: 'F',
      telefone: '(11) 99876-5432',
      email: 'maria@email.com',
      endereco: 'Avenida B, 456',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '02154000',
      status: 'ativo',
    });

    const paciente3 = await Paciente.create({
      nome: 'Pedro Ferreira Lima',
      cpf: '55555555555',
      dataNascimento: new Date('1990-07-10'),
      genero: 'M',
      telefone: '(11) 97777-7777',
      email: 'pedro@email.com',
      endereco: 'Rua C, 789',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '03100100',
      status: 'internado',
      leito: '205',
    });

    console.log('✓ Pacientes criados');

    // Criar médicos
    const medico = await Medico.create({
      nome: 'Dr. Carlos Mendes',
      crm: '123456/SP',
      especialidade: 'Cardiologia',
      telefone: '(11) 98765-1234',
      email: 'carlos.mendes@hospital.com',
      disponibilidade: 'disponivel',
      consultorioNumero: '301',
    });

    const medico2 = await Medico.create({
      nome: 'Dra. Ana Silva',
      crm: '654321/SP',
      especialidade: 'Pneumologia',
      telefone: '(11) 99876-5678',
      email: 'ana.silva@hospital.com',
      disponibilidade: 'ocupado',
      consultorioNumero: '302',
    });

    const medico3 = await Medico.create({
      nome: 'Dr. Roberto Santos',
      crm: '789012/SP',
      especialidade: 'Ortopedia',
      telefone: '(11) 97654-3210',
      email: 'roberto.santos@hospital.com',
      disponibilidade: 'disponivel',
      consultorioNumero: '303',
    });

    console.log('✓ Médicos criados');

    // Criar consultas
    const consulta1 = await Consulta.create({
      pacienteId: paciente1.id,
      medicoId: medico.id,
      dataHora: new Date('2026-05-20 10:00:00'),
      tipo: 'presencial',
      motivo: 'Avaliação cardiológica',
      status: 'agendada',
    });

    const consulta2 = await Consulta.create({
      pacienteId: paciente2.id,
      medicoId: medico2.id,
      dataHora: new Date('2026-05-21 14:30:00'),
      tipo: 'presencial',
      motivo: 'Consulta de rotina',
      status: 'agendada',
    });

    const consulta3 = await Consulta.create({
      pacienteId: paciente3.id,
      medicoId: medico3.id,
      dataHora: new Date('2026-05-19 09:00:00'),
      tipo: 'presencial',
      motivo: 'Avaliação pós-operatória',
      status: 'realizada',
      anotacoes: 'Paciente em boa recuperação',
    });

    console.log('✓ Consultas criadas');

    // Criar prontuários
    const prontuario1 = await Prontuario.create({
      pacienteId: paciente1.id,
      dataAtendimento: new Date(),
      queixa: 'Dor no peito e falta de ar',
      historico: 'Paciente com histórico de hipertensão',
      diagnostico: 'Insuficiência cardíaca leve',
      medicamentos: JSON.stringify([
        { nome: 'Enalapril', dosagem: '10mg', frequencia: '2x ao dia' },
        { nome: 'Furosemida', dosagem: '40mg', frequencia: '1x ao dia' },
      ]),
      examesSolicitados: JSON.stringify(['ECG', 'Ecocardiograma', 'Hemograma']),
      condutaClinica: 'Internação para monitoramento',
      medicoResponsavel: 'Dr. Carlos Mendes',
    });

    const prontuario2 = await Prontuario.create({
      pacienteId: paciente2.id,
      dataAtendimento: new Date(),
      queixa: 'Tosse persistente há 2 semanas',
      historico: 'Fumante há 20 anos',
      diagnostico: 'Bronquite crônica',
      medicamentos: JSON.stringify([
        { nome: 'Bromexina', dosagem: '8mg', frequencia: '3x ao dia' },
      ]),
      examesSolicitados: JSON.stringify(['Radiografia de tórax', 'Espirometria']),
      condutaClinica: 'Acompanhamento ambulatorial',
      medicoResponsavel: 'Dra. Ana Silva',
    });

    console.log('✓ Prontuários criados');

    console.log('\n✅ Seed executado com sucesso!');
    console.log('\n📋 Dados de teste criados:');
    console.log('   - 3 Usuários (admin, médico, enfermeiro)');
    console.log('   - 3 Pacientes');
    console.log('   - 3 Médicos');
    console.log('   - 3 Consultas');
    console.log('   - 2 Prontuários');

    console.log('\n🔐 Credenciais de teste:');
    console.log('   Admin: admin@medicare.com / admin123');
    console.log('   Médico: medico@medicare.com / medico123');
    console.log('   Enfermeiro: enfermeiro@medicare.com / enf123');

    await sequelize.close();
  } catch (error) {
    console.error('✗ Erro ao executar seed:', error);
    process.exit(1);
  }
}

seed();
