import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  export const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      console.log('API response:', data); // Para debug
      return data;
    } catch (error) {
      console.error('API error:', error);
      return [];
    }
  };

export const createProduct = async (formData: FormData) => {
  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
    try {
      const response = await api.patch(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
