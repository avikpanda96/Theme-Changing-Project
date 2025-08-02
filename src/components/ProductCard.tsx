import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { theme } = useTheme();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const cardStyle = theme === 'colorful' 
    ? 'card-hover border-2 border-accent/20 shadow-lg' 
    : theme === 'dark'
      ? 'bg-card border-border shadow-md hover:shadow-lg'
      : 'bg-card border-border shadow-sm hover:shadow-md';

  return (
    <Card 
      className={`${cardStyle} theme-transition grid-enter`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      <CardHeader className="pb-4">
        <div className="aspect-square relative overflow-hidden rounded-md bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full p-4 theme-transition hover:scale-105"
            loading="lazy"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <CardTitle className={`mb-2 line-clamp-2 ${
          theme === 'colorful' ? 'text-lg' : 'text-base'
        }`}>
          {product.title}
        </CardTitle>
        
        <CardDescription className="mb-3 line-clamp-3">
          {truncateDescription(product.description, theme === 'colorful' ? 100 : 80)}
        </CardDescription>
        
        <div className="flex items-center justify-between mb-3">
          <span className={`font-bold ${
            theme === 'colorful' ? 'text-2xl text-primary' : 'text-xl'
          }`}>
            {formatPrice(product.price)}
          </span>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">
          Category: {product.category}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full theme-transition ${
            theme === 'colorful' 
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3' 
              : ''
          }`}
          variant={theme === 'dark' ? 'default' : 'default'}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;