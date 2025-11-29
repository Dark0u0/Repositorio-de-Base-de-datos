import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../../config/database.config.js';

export class PostModel extends Model {}

PostModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
    comment: {
        type: DataTypes.STRING(255),
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
  modelName: 'Post',
  tableName: 'post',
  timestamps: false,
  createdAt: 'created_at',});
