import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

export const dbConnection: Promise<Connection> = createConnection();
