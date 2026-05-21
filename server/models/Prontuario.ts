import { DataTypes, Model, ForeignKey } from 'sequelize';
import sequelize from '../config/database';
import Paciente from './Paciente';

export class Prontuario extends Model {
  public id!: number;
  public pacienteId!: ForeignKey<Paciente['id']>;
  public dataAtendimento!: Date;
  public queixa!: string;
  public historico?: string;
  public diagnostico?: string;
  public medicamentos?: string;
  public examesSolicitados?: string;
  public condutaClinica?: string;
  public medicoResponsavel!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public paciente?: Paciente;
}

Prontuario.init(
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
    dataAtendimento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    queixa: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    historico: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diagnostico: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicamentos: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'JSON array de medicamentos prescritos',
    },
    examesSolicitados: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'JSON array de exames solicitados',
    },
    condutaClinica: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicoResponsavel: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'prontuarios',
    timestamps: true,
  }
);

// Associations
Prontuario.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
Paciente.hasMany(Prontuario, { foreignKey: 'pacienteId', as: 'prontuarios' });

export default Prontuario;
