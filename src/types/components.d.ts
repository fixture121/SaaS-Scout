declare module '@/components/ProductCard' {
  import { Product } from '@/types';
  interface ProductCardProps {
    product: Product;
    showCompatibility?: boolean;
  }
  const ProductCard: React.FC<ProductCardProps>;
  export default ProductCard;
} 