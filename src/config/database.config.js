import { Sequelize } from 'sequelize';

const dbConfig = {
    host: "localhost",
    database: "electron_app",
    username: "root",
    password: "",
    dialect: "mysql",
    timezone: "-05:00",
    port: "3307",
    logging: false, /** Change this value to see sql instructions  */
    pool: {
        max: 5,
        min: 5,
        acquire: 60000,
        idle: 15000
    }
}

export const DatabaseConfig = new Sequelize(dbConfig);

export class Database {
    /**
     * Start the database connection
     * @returns {Promise<{ok: boolean, message: string}>}
     */
    async connection() {
        try {
            await DatabaseConfig.authenticate();
            console.log('Connection has been established successfully.');
            return { ok: true, message: 'Connection to the database established correctly' };
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return { ok: false, message: `Could not connect to the database. Please check the following: ${error}`  }
        }
    }
}
