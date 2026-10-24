import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Course extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = values.id ? values.id.toString() : null;
    return values;
  }
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      trim: true,
    },
    slug: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      set(val) {
        if (val) this.setDataValue('slug', val.trim().toLowerCase());
      },
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const val = this.getDataValue('price');
        return val !== null ? Number(val) : 0;
      },
    },
    currency: {
      type: DataTypes.STRING(10),
      defaultValue: 'INR',
    },
    gstInfo: {
      type: DataTypes.STRING(50),
      defaultValue: '+ GST',
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fullDescription: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const val = this.getDataValue('features');
        if (typeof val === 'string') {
          try {
            return JSON.parse(val);
          } catch (e) {
            return [];
          }
        }
        return val || [];
      },
    },
    syllabus: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const val = this.getDataValue('syllabus');
        if (typeof val === 'string') {
          try {
            return JSON.parse(val);
          } catch (e) {
            return [];
          }
        }
        return val || [];
      },
    },
    prerequisites: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const val = this.getDataValue('prerequisites');
        if (typeof val === 'string') {
          try {
            return JSON.parse(val);
          } catch (e) {
            return [];
          }
        }
        return val || [];
      },
    },
    targetAudience: {
      type: DataTypes.STRING(255),
      defaultValue: 'Students and professionals aspiring to build cybersecurity careers',
    },
    duration: {
      type: DataTypes.STRING(255),
      defaultValue: 'Live sessions with hands-on lab access',
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true,
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['activeStatus', 'sortOrder'],
      },
    ],
  }
);
