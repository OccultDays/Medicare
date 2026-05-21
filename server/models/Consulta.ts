import { DataTypes, Model, ForeignKey } from 'sequelize';
import sequelize from '../config/database';
import Paciente from './Paciente';
import Medico from './Medico';

export class Consulta extends Model {
  public id!: number;
  public pacienteId!: ForeignKey<Paciente['id']>;
  public medicoId!: ForeignKey<Medico['id']>;
  public dataHora!: Date;
  public tipo!: 'presencial' | 'teleconsulta' | 'retorno';
  public motivo!: string;
  public status!: 'agendada' | 'realizada' | 'cancelada' | 'ausente';
  public anotacoes?: string;
  public prescricao?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public paciente?: Paciente;
  public medico?: Medico;
}

Consulta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    medicoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('presencial', 'teleconsulta', 'retorno'),
      defaultValue: 'presencial',
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('agendada', 'realizada', 'cancelada', 'ausente'),
      defaultValue: 'agendada',
      allowNull: false,
    },
    anotacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prescricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'consultas',
    timestamps: true,
  }
);

// Associations
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
Consulta.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });
Paciente.hasMany(Consulta, { foreignKey: 'pacienteId', as: 'consultas' });
Medico.hasMany(Consulta, { foreignKey: 'medicoId', as: 'consultas' });

export default Consulta;
