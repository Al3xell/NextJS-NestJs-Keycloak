import { Dialect } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";

export const DB: Partial<SequelizeOptions> = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    logQueryParameters: true
}