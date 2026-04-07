'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                <div className="w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden shrink-0 relative">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                  )}
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
              <a
                href={`https://wa.me/57${(() => {
                  const lineas = items.map(i => `• ${i.name} x${i.quantity}${i.price > 0 ? ` — $${(i.price * i.quantity).toLocaleString('es-CO')}` : ''}`)
                  const total = totalPrice > 0 ? `\n\nTotal estimado: $${totalPrice.toLocaleString('es-CO')}` : ''
                  return `3054471598?text=${encodeURIComponent(`Hola! Me gustaría hacer el siguiente pedido:\n\n${lineas.join('\n')}${total}\n\n¿Pueden confirmarme disponibilidad y forma de pago?`)}`
                })()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-full transition-colors shadow-sm mb-3 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hacer pedido por WhatsApp
              </a>
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
