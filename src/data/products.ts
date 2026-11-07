export type ProductCategory = 'soap' | 'home-care';
import Liquid from "/images/liquid.jpg"
import Bar from "/images/bar.png"
import Multi from "/images/mult.jpeg"
import Work from "/images/work-soap.jpeg"
import Floor from "/images/floor.jpeg"


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
  { id: 'liquid-hand-soap', name: 'Liquid Hand Soap', category: 'soap', size: '5 litres', description: 'Gentle everyday cleansing with a fresh, clean feel.', price: 5000, image: Liquid, alt: 'Blue glass bottle of liquid soap' },
  { id: 'antibacterial-bar-soap', name: 'Antibacterial Bar Soap', category: 'soap', size: 'Pack of 5', description: 'Long lasting, plant based bars for everyday use.', price: 2500, image: Bar, alt: 'Handmade bars of natural soap' },
  { id: 'multi-purpose-cleaner', name: 'Multi-Purpose Cleaner', category: 'home-care', size: '5 litres', description: 'A hardworking cleaner for surfaces and dishes.', price: 10000, image: Multi, alt: 'Cleaning products for the home' },
  { id: 'liquid-soap-1l', name: 'Bar soap', category: 'soap', size: '1 litre', description: 'A handy size for kitchens, bathrooms, and refills.', price: 1500, image: Work, alt: 'Liquid soap bottle' },
  { id: 'liquid-soap-20l', name: 'Liquid Soap · 20L', category: 'soap', size: '20 litres', description: 'Bulk value for busy homes, shops, and workplaces.', price: 35000, image: Liquid, alt: 'Bulk liquid soap container' },
  { id: 'floor-cleaner', name: 'Floor & Surface Cleaner', category: 'home-care', size: '5 litres', description: 'A dependable clean for the surfaces you use every day.', price: 8000, image: Floor, alt: 'Home cleaning products' },
];

export const formatPrice = (amount: number): string => new Intl.NumberFormat('en-RW').format(amount);
