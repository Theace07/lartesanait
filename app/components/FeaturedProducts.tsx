'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const FEATURED_IMAGES = [
  '/productos/cuadro-oleos-saxofonista.png',
  '/productos/cuadro-retablo-personalizable1.png',
  '/productos/cuadro-carro.jpeg',
  '/productos/florero-estilo-rustico.png',
  '/productos/cuadro-jesus.jpeg',
]

const FALLBACK = [
  { image: '/productos/cuadro-oleos-saxofonista.png', name: 'Cuadro Óleo Saxofonista', price: 0, category: 'Cuadros', emoji: '🎨' },
  { image: '/productos/cuadro-retablo-personalizable1.png', name: 'Retablo Personalizable', price: 0, category: 'Retablos', emoji: '🖼️' },
  { image: '/productos/cuadro-carro.jpeg', name: 'Cuadro El Carro', price: 0, category: 'Cuadros', emoji: '🎨' },
  { image: '/productos/florero-estilo-rustico.png', name: 'Florero Estilo Rústico', price: 0, category: 'Decoración', emoji: '🌿' },
  { image: '/productos/cuadro-jesus.jpeg', name: 'Cuadro Jesús', price: 0, category: 'Cuadros', emoji: '✝️' },
]

interface Product {
  image: string
  name: string
  price: number
  category: string
  emoji: string
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(FALLBACK)

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then(snap => {
        if (snap.empty) return
        const all = snap.docs.map(d => d.data() as Product)
        const featured = FEATURED_IMAGES.map(img => {
          const found = all.find(p => p.image === img)
          return found ?? FALLBACK.find(f => f.image === img)!
        })
        setProducts(featured)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Link
          key={product.image}
          href={`/productos?producto=${encodeURIComponent(product.image)}`}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-100 group"
        >
          <div className="relative h-44 bg-zinc-100 overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">{product.emoji}</div>
            )}
          </div>
          <div className="p-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">{product.category}</span>
            <h3 className="font-semibold text-zinc-900 text-sm mt-1">{product.name}</h3>
            <p className="text-zinc-900 font-bold mt-2">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
