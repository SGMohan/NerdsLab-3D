import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class FAQ extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = values.id ? values.id.toString() : null;
    return values;
  }
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      defaultValue: 'General',
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'FAQ',
    tableName: 'faqs',
    timestamps: true,
    indexes: [
      {
        fields: ['activeStatus', 'displayOrder'],
      },
    ],
  }
);
