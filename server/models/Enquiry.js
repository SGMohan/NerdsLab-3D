import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Enquiry extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = values.id ? values.id.toString() : null;
    return values;
  }
}

Enquiry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      validate: {
        isEmail: true,
      },
      set(val) {
        if (val) this.setDataValue('email', val.trim().toLowerCase());
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    selectedCourse: {
      type: DataTypes.STRING(191),
      defaultValue: 'General Inquiries',
    },
    enquiryType: {
      type: DataTypes.ENUM('Course Enquiry', 'Free Demo Request', 'General Contact'),
      defaultValue: 'Course Enquiry',
    },
    subject: {
      type: DataTypes.STRING(255),
      defaultValue: 'Cybersecurity Training Inquiry',
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    submissionStatus: {
      type: DataTypes.ENUM('new', 'contacted', 'enrolled', 'closed'),
      defaultValue: 'new',
    },
  },
  {
    sequelize,
    modelName: 'Enquiry',
    tableName: 'enquiries',
    timestamps: true,
    indexes: [
      {
        fields: ['submissionStatus'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  }
);
