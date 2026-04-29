import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts, Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.resolve(getProductById(Number(id))).then(data => {
      if (data) {
        setProduct(data);
        document.title = `${data.name} - Toko Online`;
        Promise.resolve(getRelatedProducts(data.category, data.id)).then(setRelated);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Memuat produk...</div>;
  }

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xl font-bold">Produk tidak ditemukan</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/?category=${product.category}`} className="hover:text-indigo-600 transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <img src={product.image} alt={product.name} width="600" height="600" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <div className="text-indigo-600 font-semibold tracking-wider uppercase text-sm mb-2">{product.category}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-700">{product.rating}</span>
              </div>
              <div className="text-sm text-gray-500 border-l border-gray-200 pl-4">
                Stok: <span className="font-medium text-gray-900">{product.stock}</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="flex gap-4 mt-auto">
              <button 
                onClick={() => { addToCart(product); alert('Ditambahkan ke keranjang'); }}
                className="flex-1 bg-indigo-50 text-indigo-700 py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-100 transition-colors duration-200"
              >
                Tambah ke Keranjang
              </button>
              <button 
                onClick={() => { addToCart(product); navigate('/checkout'); }}
                className="flex-1 bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
              >
                Beli Sekarang
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Gratis Ongkir</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Garansi Resmi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RotateCcw className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Retur 7 Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
