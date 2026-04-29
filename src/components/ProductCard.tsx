import { Link } from 'react-router-dom';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
      <Link to={`/products/${product.id}`} className="block relative aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          width="400"
          height="400"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-indigo-500 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); alert('Ditambahkan ke keranjang'); }}
            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}
