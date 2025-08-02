import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Palette, AlertCircle, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const { products, loading, error } = useProducts();
  const [showAllProducts, setShowAllProducts] = useState(false);

  const features = [
    {
      icon: Palette,
      title: 'Dynamic Themes',
      description: 'Switch between three beautiful themes instantly'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed and responsiveness'
    },
    {
      icon: Sparkles,
      title: 'Modern Design',
      description: 'Beautiful UI components with smooth animations'
    }
  ];

  const getThemeSpecificContent = () => {
    switch (theme) {
      case 'dark':
        return {
          title: 'Professional Dashboard',
          subtitle: 'Sophisticated dark interface for power users',
          description: 'Experience the elegance of our dark theme with sidebar navigation and professional typography.',
        };
      case 'colorful':
        return {
          title: 'Vibrant Experience! 🎨',
          subtitle: 'Colorful and playful interface design',
          description: 'Dive into our most vibrant theme with bright colors, playful fonts, and grid-based layouts that spark creativity!',
        };
      default:
        return {
          title: 'Welcome to ThemeZone',
          subtitle: 'Clean and minimalist design approach',
          description: 'Discover the beauty of simplicity with our clean, minimalist interface designed for focus and clarity.',
        };
    }
  };

  const content = getThemeSpecificContent();

  const gridClass = theme === 'colorful' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
    : theme === 'dark'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <CardTitle>Oops! Something went wrong</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className={`text-center ${theme === 'colorful' ? 'py-12' : 'py-8'}`}>
        <h1 className={`mb-4 theme-transition ${
          theme === 'colorful' 
            ? 'text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent' 
            : theme === 'dark'
              ? 'text-3xl md:text-5xl font-bold'
              : 'text-4xl md:text-5xl font-bold'
        }`}>
          {content.title}
        </h1>
        
        <p className={`mb-6 theme-transition ${
          theme === 'colorful' 
            ? 'text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto' 
            : 'text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'
        }`}>
          {content.subtitle}
        </p>
        
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {content.description}
        </p>
        
        <Button 
          size={theme === 'colorful' ? 'lg' : 'default'}
          className={theme === 'colorful' ? 'text-lg px-8 py-6' : ''}
        >
          Explore Products
        </Button>
      </section>

      {/* Features Section */}
      <section>
        <h2 className={`mb-8 text-center theme-transition ${
          theme === 'colorful' ? 'text-3xl font-bold' : 'text-2xl font-semibold'
        }`}>
          Why Choose ThemeZone?
        </h2>
        
        <div className={theme === 'colorful' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`text-center ${
                  theme === 'colorful' 
                    ? 'card-hover border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5' 
                    : 'hover:shadow-md theme-transition'
                }`}
              >
                <CardHeader>
                  <div className={`mx-auto rounded-full flex items-center justify-center mb-4 ${
                    theme === 'colorful' 
                      ? 'w-16 h-16 bg-primary/10' 
                      : 'w-12 h-12 bg-primary/10'
                  }`}>
                    <Icon className={`text-primary ${theme === 'colorful' ? 'w-8 h-8' : 'w-6 h-6'}`} />
                  </div>
                  <CardTitle className={theme === 'colorful' ? 'text-xl' : 'text-lg'}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className={`theme-transition ${
            theme === 'colorful' ? 'text-3xl font-bold' : 'text-2xl font-semibold'
          }`}>
            Featured Products
          </h2>
          <span className="text-muted-foreground">
            {products.length} products available
          </span>
        </div>
        
        <div className={gridClass}>
          {(showAllProducts ? products : products.slice(0, theme === 'colorful' ? 12 : 8)).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {products.length > (theme === 'colorful' ? 12 : 8) && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAllProducts(!showAllProducts)}
            >
              {showAllProducts ? 'Show Less' : 'View All Products'}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;