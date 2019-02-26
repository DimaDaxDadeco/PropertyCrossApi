import { app } from './app';
import { dbConnection } from './database';
import { initData } from './mocks/initdata';

const PORT: number = Number(process.env.PORT) || 3000;

(async () => {
  try {
    await dbConnection;
    console.log('DB connected');
    await initData();
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
})();
