import { config } from 'dotenv'

config();

export const PORT = process.env.PORT
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME
export const METAR_API_KEY = process.env.METAR_API_KEY
export const NEWS_IMG_ROUTE = process.env.NEWS_IMG_ROUTE
export const AIRPLANE_IMG_ROUTE = process.env.AIRPLANE_IMG_ROUTE

