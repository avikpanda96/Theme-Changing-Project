import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@themezone.dev',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Design Street, Web City, WC 12345',
      description: 'Visit our office'
    }
  ];

  const faqs = [
    {
      question: 'How do I switch themes?',
      answer: 'Use the theme dropdown in the header (or sidebar in dark mode) to switch between our three themes.'
    },
    {
      question: 'Are themes saved between sessions?',
      answer: 'Yes! Your theme preference is automatically saved in localStorage and will persist across browser sessions.'
    },
    {
      question: 'Is the app mobile-friendly?',
      answer: 'Absolutely! All three themes are fully responsive and optimized for mobile, tablet, and desktop devices.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const getThemeSpecificContent = () => {
    switch (theme) {
      case 'dark':
        return {
          title: 'Get In Touch',
          subtitle: 'Professional support and consultation',
          description: 'Reach out to our team for technical support, business inquiries, or development partnerships.',
        };
      case 'colorful':
        return {
          title: 'Let\'s Connect! 🌟',
          subtitle: 'We\'d love to hear from you',
          description: 'Drop us a line and let\'s start a conversation! We\'re here to help with any questions or just to chat about design!',
        };
      default:
        return {
          title: 'Contact Us',
          subtitle: 'We\'re here to help',
          description: 'Have a question or need support? Get in touch with our team and we\'ll respond as soon as possible.',
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

      <div className={`grid ${theme === 'colorful' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
        {/* Contact Form */}
        <div className={theme === 'colorful' ? 'lg:col-span-2' : ''}>
          <Card className={theme === 'colorful' ? 'border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center ${theme === 'colorful' ? 'text-2xl' : 'text-xl'}`}>
                <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                Send us a message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size={theme === 'colorful' ? 'lg' : 'default'}
                  className={`w-full ${theme === 'colorful' ? 'text-lg py-6' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card className={theme === 'colorful' ? 'border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5' : ''}>
            <CardHeader>
              <CardTitle className={theme === 'colorful' ? 'text-xl' : 'text-lg'}>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === 'colorful' 
                        ? 'w-10 h-10 bg-primary/10' 
                        : 'w-8 h-8 bg-primary/10'
                    }`}>
                      <Icon className={`text-primary ${theme === 'colorful' ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{info.title}</h4>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className={theme === 'colorful' ? 'border-2 border-secondary/20 bg-gradient-to-br from-card to-secondary/5' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center ${theme === 'colorful' ? 'text-xl' : 'text-lg'}`}>
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
              <Badge variant="secondary" className="mt-3">
                <CheckCircle className="w-3 h-3 mr-1" />
                Currently Open
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section>
        <h2 className={`mb-6 theme-transition ${
          theme === 'colorful' ? 'text-3xl font-bold text-center' : 'text-2xl font-semibold'
        }`}>
          Frequently Asked Questions
        </h2>
        
        <div className={theme === 'colorful' ? 'grid grid-cols-1 md:grid-cols-1 gap-6 max-w-4xl mx-auto' : 'space-y-4 max-w-3xl mx-auto'}>
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className={theme === 'colorful' ? 'border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5' : ''}
            >
              <CardHeader>
                <CardTitle className={theme === 'colorful' ? 'text-lg' : 'text-base'}>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;