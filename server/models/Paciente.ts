import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Paciente extends Model {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public dataNascimento!: Date;
  public genero!: 'M' | 'F' | 'O';
  public telefone!: string;
  public email!: string;
  public endereco!: string;
  public cidade!: string;
  public estado!: string;
  public cep!: string;
  public status!: 'ativo' | 'internado' | 'alta' | 'óbito';
  public leito?: string;
  public observacoes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isEmail: true },
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'internado', 'alta', 'óbito'),
      defaultValue: 'ativo',
      allowNull: false,
    },
    leito: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'pacientes',
    timestamps: true,
  }
);

export default Paciente;
