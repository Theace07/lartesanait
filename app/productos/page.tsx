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
}: {
  product: Product
  added: boolean
  onAdd: () => void
  showNavidadBadge: boolean
}) {
  const images = product.gallery && product.gallery.length > 1 ? product.gallery : null
  const [current, setCurrent] = useState(0)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i - 1 + images!.length) % images!.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i + 1) % images!.length)
  }

  const displaySrc = images ? images[current] : product.image

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zinc-100 group flex flex-col">
      <div className="relative h-72 bg-zinc-100 overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
          {displaySrc ? (
            <Image
              src={displaySrc}
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

        {images && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'bg-white w-4 h-1.5' : 'bg-white/50 hover:bg-white/80 w-1.5 h-1.5'}`}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent pt-8 pb-2 px-2 flex gap-1.5 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  className={`relative w-10 h-10 shrink-0 rounded-lg overflow-hidden ring-2 transition-all duration-200 ${i === current ? 'ring-white scale-110' : 'ring-white/30 hover:ring-white/70 opacity-70 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Vista ${i + 1}`} fill className="object-cover" sizes="40px" />
                </button>
              ))}
            </div>
          </>
        )}

        {showNavidadBadge && (
          <div className="absolute top-2 left-2 bg-red-800 text-white text-xs px-2 py-0.5 rounded-full z-10">
            🎄 Navidad
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">{product.category}</span>
        <h3 className="font-bold text-zinc-900 mt-1 mb-2">{product.name}</h3>
        <p className="text-zinc-500 text-xs leading-relaxed flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
          <span className="text-lg font-bold text-zinc-900">
            {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
          </span>
          <button
            onClick={onAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${added ? 'bg-green-500 text-white scale-95' : 'bg-zinc-900 hover:bg-zinc-700 text-white'}`}
          >
            {added ? (
              <>✓ Agregado</>
            ) : (
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
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then(snap => {
        if (!snap.empty) {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product))
          setProducts(data)
        } else {
          setProducts(FALLBACK_PRODUCTS)
        }
      })
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoadingProducts(false))
  }, [])

  const filtered = activeCategory === 'Todos' ? products : products.filter(p => p.category === activeCategory)

  const handleAdd = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price })
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
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

        {loadingProducts ? (
          <div className="flex justify-center py-20">
            <p className="text-zinc-400 text-sm">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                added={added === product.id}
                onAdd={() => handleAdd(product)}
                showNavidadBadge={product.category === 'Navidad' && activeCategory !== 'Navidad'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}