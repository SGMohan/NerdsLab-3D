import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Testimonial extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = values.id ? values.id.toString() : null;
    return values;
  }
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    learnerName: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING(191),
      defaultValue: '',
    },
    location: {
      type: DataTypes.STRING(100),
      defaultValue: 'India',
    },
    approvedQuotation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    approvalStatus: {
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
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: true,
    indexes: [
      {
        fields: ['approvalStatus', 'displayOrder'],
      },
    ],
  }
);
