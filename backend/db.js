const { Sequelize } = require('sequelize');

// Render recomienda usar DATABASE_URL directamente
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para Render
    },
  },
});

sequelize.authenticate()
  .then(() => console.log('🟢 Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('🔴 Error al conectar a PostgreSQL:', err));

module.exports = sequelize;
