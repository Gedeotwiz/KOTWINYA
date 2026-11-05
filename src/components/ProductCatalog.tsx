import { useMemo, useState } from 'react';
import { formatPrice, products, type Product, type ProductCategory } from '../data/products';

const WHATSAPP_NUMBER = '250783801966';
type Filter = 'all' | ProductCategory;

function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const buyNow = () => {
    const message = [
      'Hello KOTWINYA! I would like to order:',
      `Product: ${product.name} (${product.size})`,
      `Price: ${formatPrice(product.price)} RWF each`,
      `Quantity: ${quantity}`,
      `Product image: ${product.image}`,
      'Please let me know about payment and delivery.',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <article className="product-card">
    <div className="product-image-wrap"><img className="product-image" src={product.image} alt={product.alt} loading="lazy" /><span className="product-category">{product.category === 'soap' ? 'Soap & body' : 'Home care'}</span></div>
    <div className="product-body"><h3>{product.name}</h3><p>{product.description} <span>{product.size}</span></p>
      <div className="product-meta"><span className="product-price">{formatPrice(product.price)} <small>RWF</small></span>
        <div className="buy-controls"><label className="quantity-control"><span className="sr-only">Quantity for {product.name}</span><input type="number" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(99, Number.parseInt(event.target.value, 10) || 1)))} /></label><button className="buy-button" onClick={buyNow}>Buy now ↗</button></div>
      </div>
    </div>
  </article>;
}

export default function ProductCatalog() {
  const [category, setCategory] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const searchable = `${product.name} ${product.description} ${product.size} ${product.category}`.toLowerCase();
    return matchesCategory && searchable.includes(search.trim().toLowerCase());
  }), [category, search]);

  const filters: { label: string; value: Filter }[] = [
    { label: 'All products', value: 'all' },
    { label: 'Soaps', value: 'soap' },
    { label: 'Home care', value: 'home-care' },
  ];

  return <section className="products-section section-pad" id="products"><div className="container"><div className="section-heading"><div><span className="eyebrow">CARE FOR EVERYDAY</span><h2>Made for your home.<br /><em>Rooted in our community.</em></h2></div><p>Simple, dependable essentials crafted with care. Find the right fit for your daily routine.</p></div>
    <div className="catalog-tools"><div className="filters" role="group" aria-label="Filter products by category">{filters.map((filter) => <button key={filter.value} className={`filter-chip${category === filter.value ? ' selected' : ''}`} onClick={() => setCategory(filter.value)}>{filter.label}</button>)}</div><label className="search-box"><span>⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" /><kbd>/</kbd></label></div>
    <div className="product-grid" aria-live="polite">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>{visibleProducts.length === 0 && <p className="empty-state mx-auto max-w-xl text-center text-slate-500">No products match your search. Try a different name or category.</p>}
    <div className="catalog-footer"><span>Questions or looking for bulk orders?</span><a href="#contact">Talk to our team <span>→</span></a></div>
  </div></section>;
}
