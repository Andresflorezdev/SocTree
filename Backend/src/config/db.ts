import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async ():Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.cyan.bold(`MongoDB Conectado: ${connection.connection.host}`));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
};
