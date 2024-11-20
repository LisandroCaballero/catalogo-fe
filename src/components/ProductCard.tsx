"use client";
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/lib/api';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  description: string;
}

export default function ProductCard(props: ProductCardProps) {
  const router = useRouter();
  const { id, name, price, quantity, imageUrl, category, description } = props;

  const handleEdit = () => {
    router.push(`/products/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(id.toString());
        router.refresh();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {imageUrl ? (
          <img
            src={`http://localhost:3000/uploads/${imageUrl}`}
            alt={name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-1">{category}</div>
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">USD {price}</span>
          <span className="text-sm text-gray-500">Stock: {quantity}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button 
            onClick={() => router.push(`/products/${id}`)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
          >
            Ver
          </button>
          <button 
            onClick={handleEdit}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition text-sm"
          >
            Editar
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}