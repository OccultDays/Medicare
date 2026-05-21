import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Medico extends Model {
  public id!: number;
  public nome!: string;
  public crm!: string;
  public especialidade!: string;
  public telefone!: string;
  public email!: string;
  public disponibilidade!: 'disponivel' | 'ocupado' | 'indisponivel';
  public consultorioNumero?: string;
  public observacoes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Medico.init(
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
    crm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    especialidade: {
      type: DataTypes.STRING(100),
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
    disponibilidade: {
      type: DataTypes.ENUM('disponivel', 'ocupado', 'indisponivel'),
      defaultValue: 'disponivel',
      allowNull: false,
    },
    consultorioNumero: {
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
    tableName: 'medicos',
    timestamps: true,
  }
);

export default Medico;
