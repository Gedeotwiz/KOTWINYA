export type ProductCategory = 'soap' | 'home-care';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  size: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}


export const products: Product[] = [
  { id: 'liquid-hand-soap', name: 'Liquid Hand Soap', category: 'soap', size: '5 litres', description: 'Gentle everyday cleansing with a fresh, clean feel.', price: 5000, image: '../public/images/liquid.jpg', alt: 'Blue glass bottle of liquid soap' },
  { id: 'antibacterial-bar-soap', name: 'Antibacterial Bar Soap', category: 'soap', size: 'Pack of 5', description: 'Long lasting, plant based bars for everyday use.', price: 2500, image: '../public/images/bar.png', alt: 'Handmade bars of natural soap' },
  { id: 'multi-purpose-cleaner', name: 'Multi-Purpose Cleaner', category: 'home-care', size: '5 litres', description: 'A hardworking cleaner for surfaces and dishes.', price: 10000, image: '../public/images/mult.jpeg', alt: 'Cleaning products for the home' },
  { id: 'liquid-soap-1l', name: 'Liquid Soap · 1L', category: 'soap', size: '1 litre', description: 'A handy size for kitchens, bathrooms, and refills.', price: 1500, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=82', alt: 'Liquid soap bottle' },
  { id: 'liquid-soap-20l', name: 'Liquid Soap · 20L', category: 'soap', size: '20 litres', description: 'Bulk value for busy homes, shops, and workplaces.', price: 35000, image: '../public/images/liquid.jpg', alt: 'Bulk liquid soap container' },
  { id: 'floor-cleaner', name: 'Floor & Surface Cleaner', category: 'home-care', size: '5 litres', description: 'A dependable clean for the surfaces you use every day.', price: 8000, image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=82', alt: 'Home cleaning products' },
];

export const formatPrice = (amount: number): string => new Intl.NumberFormat('en-RW').format(amount);
