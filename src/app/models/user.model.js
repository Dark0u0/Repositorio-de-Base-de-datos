import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../../config/database.config.js';

export class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: { msg: 'Email already in use' },
        validate: {
          isEmail: { msg: 'Must be a valid email address' }
        }
      },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
          len: { args: [8, 250], msg: 'Password must be at least 8 characters' }
        }
      },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    }
}, {
  sequelize: DatabaseConfig,
  modelName: 'User',
  tableName: 'user',
  timestamps: false,
  createdAt: 'created_at',});
