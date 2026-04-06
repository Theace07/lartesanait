'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function MiPedido() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="bg-zinc-50 min-h-screen">
        <section className="bg-linear-to-r from-zinc-950 to-zinc-900 text-white py-16 text-center">
          <span className="text-zinc-400 text-sm tracking-[0.3em] uppercase">❖ Carrito ❖</span>
          <h1
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Mi Pedido
          </h1>
        </section>
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <span className="text-7xl block mb-6">🛒</span>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">Tu carrito está vacío</h2>
          <p className="text-zinc-500 text-sm mb-8">
            Explorá nuestros productos y encontrá algo que te encante.
          </p>
          <Link
            href="/productos"
            className="inline-block bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <section className="bg-linear-to-r from-zinc-950 to-zinc-900 text-white py-16 text-center">
        <span className="text-zinc-400 text-sm tracking-[0.3em] uppercase">❖ Carrito ❖</span>
        <h1
          className="text-4xl font-bold mt-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Mi Pedido
        </h1>
        <p className="text-zinc-400 mt-3 text-sm">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu carrito
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  🛍️
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-zinc-900 truncate">{item.name}</h3>
                  <p className="text-zinc-600 font-bold text-sm mt-1">
                    ${item.price.toLocaleString('es-AR')} c/u
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold transition-colors text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold text-zinc-900 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold transition-colors text-lg leading-none"
                  >
                    +
                  </button>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-zinc-900">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="text-zinc-400 hover:text-red-500 text-sm text-center transition-colors py-2"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 sticky top-32">
              <h2
                className="font-bold text-zinc-900 text-lg mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Resumen del pedido
              </h2>
              <div className="flex flex-col gap-2 text-sm mb-4">
                <div className="flex justify-between text-zinc-600">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
                  </span>
                  <span>${totalPrice.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">A calcular</span>
                </div>
              </div>
              <div className="border-t border-zinc-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-zinc-900">
                  <span>Total</span>
                  <span className="text-zinc-900 text-lg">
                    ${totalPrice.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
              <button className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3.5 rounded-full transition-colors shadow-sm mb-3">
                Proceder al pago
              </button>
              <Link
                href="/productos"
                className="block text-center text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
