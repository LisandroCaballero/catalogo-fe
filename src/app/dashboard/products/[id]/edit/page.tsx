import ProductEditForm from '@/components/ProductEditForm';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductEditForm productId={params.id} />
    </div>
  );
}