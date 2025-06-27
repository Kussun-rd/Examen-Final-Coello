const express = require('express');
const app = express();
const sequelize = require('./db');
const productosRoutes = require('./routes/productosRoutes');

app.use(express.json());
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
  try {
    await sequelize.sync(); // <- crea tablas automáticamente si no existen
    console.log('🛠️ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
});
