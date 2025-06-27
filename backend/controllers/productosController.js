const Producto = require('../models/producto');

exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.codProducto);
    if (!producto) return res.status(404).json({ message: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nomPro, precioProducto, stockProducto } = req.body;

    // Validación básica
    if (!nomPro || precioProducto == null || stockProducto == null) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const nuevo = await Producto.create({ nomPro, precioProducto, stockProducto });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error('❌ Error al crear producto:', err); // esto se verá en Render
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizado = await Producto.update(req.body, {
      where: { codProducto: req.params.codProducto }
    });
    if (actualizado[0] === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const eliminado = await Producto.destroy({
      where: { codProducto: req.params.codProducto }
    });
    if (!eliminado) return res.status(404).json({ message: 'No encontrado' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
