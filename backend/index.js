const express = require('express');
const cors = require('cors'); // ✅ Importa cors
const app = express();
const sequelize = require('./db');
const productosRoutes = require('./routes/productosRoutes');

// ✅ Aplica CORS para permitir solicitudes desde tu frontend en Render
app.use(cors({
  origin: 'https://examen-final-coello-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
  try {
    await sequelize.sync();
    console.log('🛠️ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
});
