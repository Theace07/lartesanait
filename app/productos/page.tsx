'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

interface Product {
  id: string
  name: string
  price: number
  category: string
  emoji: string
  image: string
  gallery?: string[]
  description: string
}

function ProductCard({
  product,
  added,
  onAdd,
  showNavidadBadge,
  onOpen,
}: {
  product: Product
  added: boolean
  onAdd: () => void
  showNavidadBadge: boolean
  onOpen: () => void
}) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zinc-100 group flex flex-col cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-72 bg-zinc-100 overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {product.emoji}
            </div>
          )}
        </div>
        {showNavidadBadge && (
          <div className="absolute top-2 left-2 bg-red-800 text-white text-xs px-2 py-0.5 rounded-full z-10">
            🎄 Navidad
          </div>
        )}
        {product.gallery && product.gallery.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10 backdrop-blur-sm">
            {product.gallery.length} fotos
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">{product.category}</span>
        <h3 className="font-bold text-zinc-900 mt-1 mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
          <span className="text-lg font-bold text-zinc-900">
            {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
          </span>
          <button
            onClick={e => { e.stopPropagation(); onAdd() }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${added ? 'bg-green-500 text-white scale-95' : 'bg-zinc-900 hover:bg-zinc-700 text-white'}`}
          >
            {added ? <>✓ Agregado</> : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductModal({
  product,
  added,
  onAdd,
  onClose,
}: {
  product: Product
  added: boolean
  onAdd: () => void
  onClose: () => void
}) {
  const images = product.gallery && product.gallery.length > 1 ? product.gallery : product.image ? [product.image] : []
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [images.length, onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="relative md:w-1/2 bg-zinc-950 flex-shrink-0">
          <div className="relative h-80 md:h-full min-h-[420px]">
            {images[current] ? (
              <Image
                src={images[current]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">{product.emoji}</div>
            )}
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setCurrent(i => (i + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden ring-2 transition-all ${i === current ? 'ring-white scale-110' : 'ring-white/30 opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col p-7 md:w-1/2 overflow-y-auto">
          <button onClick={onClose} className="self-end text-zinc-400 hover:text-zinc-900 transition-colors mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">{product.category}</span>
          <h2 className="text-2xl font-bold text-zinc-900 mt-1 mb-4" style={{ fontFamily: 'Georgia, serif' }}>{product.name}</h2>
          {product.description && product.description !== 'Descripción pendiente.' && (
            <p className="text-zinc-600 text-sm leading-relaxed mb-6">{product.description}</p>
          )}
          <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
            <span className="text-2xl font-bold text-zinc-900">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar precio'}
            </span>
            <button
              onClick={onAdd}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${added ? 'bg-green-500 text-white scale-95' : 'bg-zinc-900 hover:bg-zinc-700 text-white'}`}
            >
              {added ? <>✓ Agregado</> : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Agregar al pedido
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const FALLBACK_PRODUCTS: Product[] = [
  { id: '1', name: 'Cuadro Campesinito al Óleo', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-campesinito-oleos.png', description: 'Descripción pendiente.' },
  { id: '2', name: 'Cuadro Óleo Mujer', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleo-mujer-estilo1.png', gallery: ['/productos/cuadro-oleo-mujer-estilo1.png', '/productos/cuadro-oleo-mujer-estilo2.png'], description: 'Descripción pendiente.' },
  { id: '4', name: 'Cuadro Óleo Copa de Cerezas', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleos-copa-cerezas.png', description: 'Descripción pendiente.' },
  { id: '5', name: 'Cuadro Óleo Saxofonista', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleos-saxofonista.png', description: 'Descripción pendiente.' },
  { id: '6', name: 'Cuadro Virgen de Guadalupe', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-virgen-guadalupe.png', description: 'Descripción pendiente.' },
  { id: '7', name: 'Cuadro Virgen', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-virgen.png', description: 'Descripción pendiente.' },
  { id: '8', name: 'Retablo Floreros Tríptico al Óleo', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/cuadro-retablo-floreros-oleos-triptico.png', description: 'Descripción pendiente.' },
  { id: '9', name: 'Retablo Personalizable', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/cuadro-retablo-personalizable1.png', gallery: ['/productos/cuadro-retablo-personalizable1.png', '/productos/cuadro-retablo-personalizable2.png', '/productos/retablo-personalizable-esilo3.png', '/productos/retablo-personalizable-estilo4.png', '/productos/retablos-personalizables.jpeg'], description: 'Descripción pendiente.' },
  { id: '11', name: 'Retablo Jarrones', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-jarrones.png', description: 'Descripción pendiente.' },
  { id: '12', name: 'Retablo Madera con Frutas', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-madera-frutas.png', description: 'Descripción pendiente.' },
  { id: '13', name: 'Retablo Óleo Mujer Abstracta', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-oleos-mujer-abstracta.png', description: 'Descripción pendiente.' },
  { id: '14', name: 'Florero Estilo Rústico', price: 0, category: 'Decoración', emoji: '🌿', image: '/productos/florero-estilo-rustico.png', description: 'Descripción pendiente.' },
  { id: '15', name: 'Alfiletero Artesanal', price: 0, category: 'Decoración', emoji: '🪡', image: '/productos/alfiletero.png', description: 'Descripción pendiente.' },
  { id: '16', name: 'Florero Navideño', price: 0, category: 'Navidad', emoji: '🎄', image: '/productos/Florero-estilo-navideño.png', description: 'Descripción pendiente.' },
  { id: '17', name: 'Papa Noel Decorativo', price: 0, category: 'Navidad', emoji: '🎅', image: '/productos/Papa_Noel.png', description: 'Descripción pendiente.' },
  { id: '18', name: 'Retablo Muñeco de Nieve', price: 0, category: 'Navidad', emoji: '⛄', image: '/productos/retablo-oleos-muñeco-nieve1.png', gallery: ['/productos/retablo-oleos-muñeco-nieve1.png', '/productos/retablo-oleos-muñeco-nieve2.png'], description: 'Descripción pendiente.' },
  { id: '19', name: 'Cuadro Jesús', price: 0, category: 'Cuadros', emoji: '✝️', image: '/productos/cuadro-jesus.jpeg', description: 'Descripción pendiente.' },
  { id: '20', name: 'Cuadro El Carro', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-carro.jpeg', description: 'Descripción pendiente.' },
  { id: '21', name: 'Caja Decorativa', price: 0, category: 'Decoración', emoji: '🎁', image: '/productos/caja-decorativa.jpeg', gallery: ['/productos/caja-decorativa.jpeg', '/productos/caja-decorativa2.jpeg', '/productos/caja-decorativa3.jpeg'], description: 'Descripción pendiente.' },
  { id: '22', name: 'Cuadro Papa Noel', price: 0, category: 'Navidad', emoji: '🎅', image: '/productos/cuadro-papanoel.jpeg', description: 'Descripción pendiente.' },
]

const categories = ['Todos', 'Cuadros', 'Retablos', 'Decoración', 'Navidad']

export default function Productos() {
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const catFromUrl = searchParams.get('categoria')
  const [activeCategory, setActiveCategory] = useState(
    catFromUrl && categories.includes(catFromUrl) ? catFromUrl : 'Todos'
  )
  const [added, setAdded] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const productoFromUrl = searchParams.get('producto')

  useEffect(() => {
    if (productoFromUrl && products.length > 0) {
      const found = products.find(p => p.image === productoFromUrl)
      if (found) setSelectedProduct(found)
    }
  }, [productoFromUrl, products])

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then(snap => {
        if (!snap.empty) {
          const data = snap.docs.map(d => {
            const p = { id: d.id, ...d.data() } as Product
            // Si el producto de Firestore no tiene galería, usar la del fallback si coincide por imagen
            if (!p.gallery || p.gallery.length === 0) {
              const fallback = FALLBACK_PRODUCTS.find(f => f.image === p.image)
              if (fallback?.gallery) p.gallery = fallback.gallery
            }
            return p
          })
          setProducts(data)
        }
      })
      .catch(() => {})
  }, [])

  const filtered = activeCategory === 'Todos' ? products : products.filter(p => p.category === activeCategory)

  const handleAdd = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          added={added === selectedProduct.id}
          onAdd={() => handleAdd(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <section className="bg-linear-to-r from-zinc-950 to-zinc-900 text-white py-16 text-center">
        <span className="text-zinc-400 text-sm tracking-[0.3em] uppercase">❖ Tienda ❖</span>
        <h1 className="text-4xl font-bold mt-3" style={{ fontFamily: 'Georgia, serif' }}>Nuestros Productos</h1>
        <p className="text-zinc-400 mt-3 text-sm">Cada pieza, una historia única</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                cat === 'Navidad'
                  ? activeCategory === 'Navidad' ? 'bg-red-800 text-white shadow-sm' : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                  : activeCategory === cat ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              {cat === 'Navidad' ? '🎄 Navidad' : cat}
            </button>
          ))}
        </div>

        {activeCategory === 'Navidad' && (
          <div className="bg-linear-to-r from-red-950 to-zinc-900 rounded-2xl p-6 mb-8 text-center border border-red-900/40">
            <p className="text-2xl mb-2">❄️ 🎄 ❄️</p>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Colección Navideña</h2>
            <p className="text-zinc-400 text-sm mt-1">Piezas artesanales para decorar tu hogar en esta época especial</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              added={added === product.id}
              onAdd={() => handleAdd(product)}
              showNavidadBadge={product.category === 'Navidad' && activeCategory !== 'Navidad'}
              onOpen={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}