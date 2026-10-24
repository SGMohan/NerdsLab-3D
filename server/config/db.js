import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'SG22@nahom';
const dbName = process.env.DB_NAME || 'nerdslab_db';

// Ensure the MySQL database exists before Sequelize connects
const ensureDatabaseExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.end();
  } catch (err) {
    console.warn(`[MySQL Setup]: Notice when verifying database existence: ${err.message}`);
  }
};

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: false,
  },
});

export const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log(`[MySQL Connected]: Database '${dbName}' on ${dbHost}:${dbPort}`);

    // Sync all defined models with database schema
    await sequelize.sync({ alter: true });
    console.log(`[MySQL Synced]: Database schema synchronized successfully`);
    return true;
  } catch (error) {
    console.error(`[MySQL Connection Error]: ${error.message}`);
    console.warn(`[Warning]: Operating with fallback/in-memory mode if MySQL service is unavailable.`);
    return false;
  }
};
