import 'dotenv/config';
import colors from 'colors';
import server from './server';
import { connectDB } from './config/db';

const port = Number(process.env.PORT) || 4000;

const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(colors.blue.bold(`Servidor Funcionando en el puerto ${port}`));
  });
};

startServer();
