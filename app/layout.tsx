import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'artesanait — Artesanías & Arte",
  description: "Descubrí piezas únicas hechas a mano. Cuadros, cerámicas, textiles y más. Envíos a todo el país.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-zinc-950 text-zinc-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p
                    className="text-white font-bold text-xl italic"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    L&apos;artesanait
                  </p>
                  <p className="text-xs mt-1 tracking-wider text-zinc-500">
                    Artesanías únicas hechas con amor
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 text-xs text-zinc-500 justify-center">
                  <a href="/nosotros" className="hover:text-white transition-colors">Nosotros</a>
                  <a href="/productos" className="hover:text-white transition-colors">Productos</a>
                  <a href="/servicio-al-cliente" className="hover:text-white transition-colors">Servicio al cliente</a>
                </div>
                <p className="text-xs text-zinc-600 text-center">
                  © 2026 L&apos;artesanait.<br />Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
