import express from 'express';
import cors from "cors";
import 'dotenv/config';
import router from './router';
import { corsConfig } from './config/cors';

const server = express();

// Cors
server.use(cors(corsConfig))

server.use(express.json())

server.use('/', router);

export default server;