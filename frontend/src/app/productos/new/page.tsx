'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createProducto } from '../../../lib/api';

export default function CrearProducto() {
  const router = useRouter();
  const [form, setForm] = useState({
    nomPro: '',
    precioProducto: '',
    stockProducto: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProducto({
      ...form,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto)
    });
    router.push('/productos');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Crear Nuevo Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                value={form.nomPro}
                onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio (S/)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={form.precioProducto}
                onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                value={form.stockProducto}
                onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" onClick={() => router.push('/productos')} className="btn btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Crear Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
