import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Gestión de Productos',
  description: 'CRUD con Next.js y Bootstrap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
