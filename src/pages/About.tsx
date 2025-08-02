import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Smartphone, Shield, Zap, Users } from 'lucide-react';

const About: React.FC = () => {
  const { theme } = useTheme();

  const technologies = [
    'React 18', 'TypeScript', 'Tailwind CSS', 'Context API', 
    'React Router', 'Lucide Icons', 'Vite', 'Modern CSS'
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Frontend Developer',
      description: 'Specializes in React and modern web technologies',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      description: 'Creates beautiful and intuitive user experiences',
      avatar: '👩‍🎨'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Theme Architect',
      description: 'Masters the art of dynamic theming systems',
      avatar: '👨‍🎨'
    }
  ];

  const features = [
    {
      icon: Palette,
      title: 'Dynamic Theming',
      description: 'Switch between three distinct themes with different layouts, colors, and typography.'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Fully responsive across all devices with adaptive layouts for each theme.'
    },
    {
      icon: Shield,
      title: 'Type Safety',
      description: 'Built with TypeScript for better development experience and fewer bugs.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimized for speed with lazy loading and efficient state management.'
    }
  ];

  const getThemeSpecificContent = () => {
    switch (theme) {
      case 'dark':
        return {
          title: 'About Our Platform',
          subtitle: 'Professional development meets elegant design',
          description: 'Built for developers and designers who appreciate sophisticated interfaces and powerful functionality.',
        };
      case 'colorful':
        return {
          title: 'About Our Creative Journey! 🚀',
          subtitle: 'Where creativity meets technology',
          description: 'We believe in making technology fun, vibrant, and accessible to everyone through delightful user experiences!',
        };
      default:
        return {
          title: 'About ThemeZone',
          subtitle: 'Simple, clean, and effective',
          description: 'We focus on creating intuitive user experiences with clean design principles and minimal complexity.',
        };
    }
  };

  const content = getThemeSpecificContent();

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
      </section>

      {/* Mission Statement */}
      <section>
        <Card className={theme === 'colorful' ? 'border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center ${theme === 'colorful' ? 'text-2xl' : 'text-xl'}`}>
              <Code className="w-6 h-6 mr-2 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              ThemeZone demonstrates the power of dynamic theming in modern web applications. 
              We've created a comprehensive example that showcases how different themes can 
              completely transform not just the visual appearance, but the entire user experience 
              of an application. From minimalist design to bold dark interfaces and playful 
              colorful layouts, we prove that one application can serve multiple design preferences 
              while maintaining functionality and performance.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section>
        <h2 className={`mb-8 theme-transition ${
          theme === 'colorful' ? 'text-3xl font-bold text-center' : 'text-2xl font-semibold'
        }`}>
          Key Features
        </h2>
        
        <div className={theme === 'colorful' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className={theme === 'colorful' ? 'card-hover border-2 border-accent/20' : 'hover:shadow-md theme-transition'}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-full flex items-center justify-center ${
                      theme === 'colorful' 
                        ? 'w-12 h-12 bg-primary/10' 
                        : 'w-10 h-10 bg-primary/10'
                    }`}>
                      <Icon className={`text-primary ${theme === 'colorful' ? 'w-6 h-6' : 'w-5 h-5'}`} />
                    </div>
                    <CardTitle className={theme === 'colorful' ? 'text-xl' : 'text-lg'}>
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Technologies */}
      <section>
        <h2 className={`mb-6 theme-transition ${
          theme === 'colorful' ? 'text-3xl font-bold text-center' : 'text-2xl font-semibold'
        }`}>
          Built With Modern Technologies
        </h2>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {technologies.map((tech, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className={`px-4 py-2 ${
                theme === 'colorful' 
                  ? 'text-base font-semibold bg-accent/20 border-accent/30' 
                  : 'text-sm'
              }`}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className={`mb-8 theme-transition ${
          theme === 'colorful' ? 'text-3xl font-bold text-center' : 'text-2xl font-semibold'
        }`}>
          Meet Our Team
        </h2>
        
        <div className={theme === 'colorful' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className={`text-center ${
                theme === 'colorful' 
                  ? 'card-hover border-2 border-accent/20 bg-gradient-to-br from-card to-secondary/5' 
                  : 'hover:shadow-md theme-transition'
              }`}
            >
              <CardHeader>
                <div className={`mx-auto rounded-full flex items-center justify-center mb-4 ${
                  theme === 'colorful' 
                    ? 'w-20 h-20 bg-primary/10 text-4xl' 
                    : 'w-16 h-16 bg-primary/10 text-3xl'
                }`}>
                  {member.avatar}
                </div>
                <CardTitle className={theme === 'colorful' ? 'text-xl' : 'text-lg'}>
                  {member.name}
                </CardTitle>
                <Badge variant="outline" className="mx-auto">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>{member.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className={`max-w-2xl mx-auto ${
          theme === 'colorful' 
            ? 'border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5' 
            : ''
        }`}>
          <CardHeader>
            <CardTitle className={theme === 'colorful' ? 'text-2xl' : 'text-xl'}>
              Ready to Explore?
            </CardTitle>
            <CardDescription>
              Experience the power of dynamic theming across all our pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size={theme === 'colorful' ? 'lg' : 'default'}>
                <Users className="w-4 h-4 mr-2" />
                Contact Our Team
              </Button>
              <Button 
                variant="outline" 
                size={theme === 'colorful' ? 'lg' : 'default'}
              >
                View Source Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;