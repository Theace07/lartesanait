import Image from 'next/image'
import Link from "next/link";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-zinc-700 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-zinc-600 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <span className="inline-block text-zinc-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            ✦ Hecho con amor ✦
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Artesanías que cuentan<br />
            <span className="text-zinc-300 italic">una historia</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            Piezas únicas creadas a mano con materiales naturales y mucho amor.
            Cada obra es irrepetible, igual que quien la recibe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 transition-colors shadow-md"
            >
              Ver Productos
            </Link>
            <Link
              href="/nosotros"
              className="border border-zinc-600 hover:border-white text-zinc-300 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Nuestra Historia
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-zinc-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold text-zinc-900 text-center mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Explorá nuestras categorías
          </h2>
          <p className="text-zinc-500 text-center text-sm mb-10">
            Cada pieza es única e irrepetible
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3gap-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Cuadros', emoji: '🎨', desc: 'Acuarelas, óleos y más', href: '/productos?categoria=Cuadros' },
              { label: 'Retablos', emoji: '🏺', desc: 'Macetas, tazas, jarras', href: '/productos?categoria=Retablos' },
              { label: 'Decoración', emoji: '✨', desc: 'Marcos, velas, objetos', href: '/productos?categoria=Decoración' },
            ].map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-zinc-200 group"
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <h3 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-zinc-500 text-xs mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2
                className="text-2xl font-bold text-zinc-900"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Productos destacados
              </h2>
              <p className="text-zinc-500 text-sm mt-1">Lo más amado por nuestros clientes</p>
            </div>
            <Link
              href="/productos"
              className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors hidden sm:block"
            >
              Ver todo →
            </Link>
          </div>
          <FeaturedProducts />
          <div className="text-center mt-8 sm:hidden">
            <Link href="/productos" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium">
              Ver todo →
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-zinc-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Buscás un regalo especial?
          </h2>
          <p className="text-zinc-400 mb-8 text-base">
            Cada pieza puede personalizarse. Hablanos y creamos algo único para vos.
          </p>
          <Link
            href="/servicio-al-cliente"
            className="inline-block bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 transition-colors shadow-md"
          >
            Contactanos
          </Link>
        </div>
      </section>
    </>
  );
}
