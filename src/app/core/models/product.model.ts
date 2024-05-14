export interface Product {
  id?: number; // Opcional, solo necesario si también usas el modelo para respuestas de la API
  title: string;
  price: number;
  description: string;
  categoryId: number; // Asegúrate de que esto coincide con 'categoryId' y no 'category_id'
  images: string[]; // Un arreglo de URLs de imágenes
  category?: Category; // Opcional, puede ser parte de la respuesta de la API
  creationAt?: string; // Opcional, solo necesario si también usas el modelo para respuestas de la API
  updatedAt?: string; // Opcional, solo necesario si también usas el modelo para respuestas de la API
}

export interface Category {
  id: number;
  name: string;
  image?: string; // Opcional, puede ser parte de la respuesta de la API
  creationAt?: string; // Opcional, solo necesario si también usas el modelo para respuestas de la API
  updatedAt?: string; // Opcional, solo necesario si también usas el modelo para respuestas de la API
}
