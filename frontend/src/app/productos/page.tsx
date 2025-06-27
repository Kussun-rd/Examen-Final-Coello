'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const res = await fetch('https://examen-final-coello.onrender.com/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProducto = async (codProducto: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`https://examen-final-coello.onrender.com/api/productos/${codProducto}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Producto eliminado correctamente');
        fetchProductos();
      } else {
        const data = await res.json();
        alert('Error al eliminar: ' + data.message);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Gestión de Productos</h2>
            <button
              onClick={() => router.push('/productos/new')}
              className="btn btn-primary"
            >
              + Agregar Producto
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod, index) => (
                  <tr key={prod.codProducto}>
                    <td>{index + 1}</td> {/* Número visual continuo */}
                    <td>{prod.nomPro}</td>
                    <td>S/ {prod.precioProducto}</td>
                    <td>{prod.stockProducto}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProducto(prod.codProducto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No hay productos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
