import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/types/products';

export const exportToPDF = (products: Product[]) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('Catálogo de Productos', 14, 20);

  // Fecha
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);

  // Tabla
  autoTable(doc, {
    head: [['Producto', 'Categoría', 'Precio', 'Stock']],
    body: products.map((product) => [
      product.name,
      product.category,
      `USD ${product.price.toFixed(2)}`,
      product.quantity
    ]),
    startY: 40,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Guardar el PDF
  doc.save('catalogo-productos.pdf');
};