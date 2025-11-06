import app from './app';
import { CONFIG } from './config/constants';

const startServer = (): void => {
  try {
    app.listen(CONFIG.PORT, () => {
      console.log(`
Servidor corriendo en puerto ${CONFIG.PORT}
Entorno: ${CONFIG.NODE_ENV}
URL: http://localhost:${CONFIG.PORT}
Health check: http://localhost:${CONFIG.PORT}/health
      `);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();