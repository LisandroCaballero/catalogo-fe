import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/types/products';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const exportToPDF = (products: Product[]) => {
  const doc = new jsPDF();
  const currentDate = new Date();
  const month = format(currentDate, 'MMMM', { locale: es });
  const year = currentDate.getFullYear();

  try {
    // Intenta agregar el logo
    doc.addImage('/logo.png', 'PNG', 15, 15, 30, 30);
  } catch (error) {
    console.warn('No se pudo cargar el logo. El PDF será generado sin él.');
  }

  // Encabezado
  doc.setFontSize(16);
  doc.text('LISTA DE PRECIOS', 105, 30, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`${year}`, 105, 40, { align: 'center' });
  doc.text(month.charAt(0).toUpperCase() + month.slice(1), 105, 50, { align: 'center' });

  // Información de contacto
  doc.setFontSize(10);
  doc.text('Ventas:', 150, 25);
  doc.text('PABLO: 1166001873', 150, 35);
  doc.text('pablocardozo358@hotmail.com.ar', 150, 45);
  doc.text('DANIEL: 1162897723', 150, 55);

  // Tabla
  autoTable(doc, {
    head: [['N°', 'Producto', 'Artículos', 'Precios', 'Cant.']],
    body: products.map((product, index) => [
      index + 1,
      product.name,
      product.category,
      `USD ${Number(product.price).toFixed(2)}`,
      `X${product.quantity}`,
    ]),
    startY: 70,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [100, 100, 100],
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 40 },
      2: { cellWidth: 60 },
      3: { cellWidth: 30 },
      4: { cellWidth: 20 },
    },
  });

  doc.save(`lista_precios_${month}_${year}.pdf`);
};
