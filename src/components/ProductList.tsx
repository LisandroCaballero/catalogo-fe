"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, MoreVertical, FileText } from "lucide-react";
import Table from "@/components/ui/Table";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import { exportToPDF } from "@/utils/pdfExport";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
  category: string;
  code: string;
}

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const mobileColumns = [
    {
      key: "combined",
      header: "Producto",
      render: (_, item: Product) => (
        <div className="flex items-center py-2">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={`http://localhost:3000/uploads/${item.imageUrl}`}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-sm text-gray-400">Código: {item.code}</p>
            <div className="mt-1 flex items-center">
              <span className="font-medium">
                USD {Number(item.price).toFixed(2)}
              </span>
              <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Stock: {item.quantity}
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === item.id ? null : item.id)
              }
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
            {activeMenu === item.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/products/${item.id}`)
                    }
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Ver
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/dashboard/products/${item.id}/edit`)
                    }
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  const desktopColumns = [
    {
      key: "imageUrl",
      header: "Imagen",
      render: (value: string, item: Product) => (
        <div className="w-12 h-12 relative">
          <Image
            src={`http://localhost:3000/uploads/${value}`}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Producto",
      render: (value: string, item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.category}</div>
        </div>
      ),
    },
    {
      key: "code",
      header: "Código",
      render: (value: string) => (
        <span className="text-sm text-gray-700">{value}</span>
      ),
    },
    {
      key: "price",
      header: "Precio",
      render: (value: string) => `USD ${Number(value).toFixed(2)}`,
    },
    {
      key: "quantity",
      header: "Stock",
      render: (value: number) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {value} unidades
        </span>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Productos</h1>
              <p className="text-sm text-gray-500">
                Lista de todos los productos disponibles
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => exportToPDF(products)}
                className="bg-red-600 text-white px-4 py-1.5 rounded font-medium text-sm hover:bg-red-700 transition-colors duration-200 shadow-sm flex items-center justify-center"
              >
                <FileText className="w-5 h-5 mr-2" /> Exportar PDF
              </button>
              <div className="hidden md:block">
                <button
                  onClick={() => router.push("/dashboard/products/create")}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded font-medium text-sm hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" /> Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="block md:hidden">
            <Table
              columns={mobileColumns}
              data={products}
              pageSize={5}
              showActions={false}
            />
          </div>
          <div className="hidden md:block">
            <Table
              columns={desktopColumns}
              data={products}
              onView={(item) => router.push(`/dashboard/products/${item.id}`)}
              onEdit={(item) =>
                router.push(`/dashboard/products/${item.id}/edit`)
              }
              onDelete={(item) => handleDelete(item.id)}
              pageSize={10}
            />
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-[80px] m-0 z-50 md:hidden">
        <button
          onClick={() => router.push("/dashboard/products/create")}
          className="flex items-center justify-center w-12 h-12 mr-4 bg-black text-white rounded shadow-lg focus:outline-none"
          style={{
            boxShadow:
              "0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)",
          }}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}