'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/productos', label: 'Productos' },
  { href: '/servicio-al-cliente', label: 'Servicio al Cliente' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de anuncio */}
      <div className="bg-zinc-950 text-zinc-400 text-center text-xs py-2 tracking-widest font-light">
        ✦ &nbsp;Artesanías únicas hechas con amor&nbsp; · &nbsp;Envíos a todo el país&nbsp; ✦
      </div>

      {/* Navegación principal */}
      <nav className="bg-zinc-950 shadow-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 21C12 21 4 16.5 4 10.5a8 8 0 0 1 16 0C20 16.5 12 21 12 21z" />
                  <path d="M12 3.5v17M4 10.5h16" />
                </svg>
              </div>
              <div className="leading-none">
                <span
                  className="block text-lg font-bold text-white tracking-wide group-hover:text-zinc-300 transition-colors"
                  style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                >
                  L&apos;artesanait
                </span>
                <span className="block text-[9px] text-zinc-500 tracking-[0.2em] uppercase mt-0.5">
                  Artesanías &amp; Arte
                </span>
              </div>
            </Link>

            {/* Links desktop */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-medium tracking-wide group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-3/4 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Carrito + Hamburguesa */}
            <div className="flex items-center gap-2">
              {/* Icono carrito */}
              <Link
                href="/mi-pedido"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-800 transition-colors duration-200 group"
                aria-label="Mi carrito"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors"
                >
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-white text-zinc-900 text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1 leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Botón hamburguesa */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Abrir menú"
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <span
                  className={`block w-5 h-0.5 bg-zinc-400 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-zinc-400 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-zinc-400 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/mi-pedido"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Mi Pedido
              </span>
              {totalItems > 0 && (
                <span className="bg-white text-zinc-900 text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
