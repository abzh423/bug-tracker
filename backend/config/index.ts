import dotenv from 'dotenv'

import config from './config.json'

dotenv.config()

type Db = {
   dialect: string
   host: string
   port: string
   database: string
   username: string
   password: string
}

const {
   DB_DIALECT = '',
   DB_PORT = '',
   DB_HOST = '',
   DB_DATABASE = '',
   DB_USERNAME = '',
   DB_PASSWORD = '',
} = process.env

const db: Db = {
   dialect: DB_DIALECT,
   port: DB_PORT,
   host: DB_HOST,
   database: DB_DATABASE,
   username: DB_USERNAME,
   password: DB_PASSWORD,
}

const {port, sessionSecret} = config

export const $db: Db = db
export const $port: number = port
export const $sessionSecret = sessionSecret
