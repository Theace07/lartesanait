'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { auth, db } from '../../../lib/firebase'

interface Product {
  id?: string
  name: string
  price: number
  category: string
  description: string
  image: string
  emoji: string
}

const CATEGORIES = ['Cuadros', 'Retablos', 'Decoración', 'Navidad']

const AVAILABLE_IMAGES = [
  'alfiletero.png',
  'caja-decorativa.jpeg',
  'caja-decorativa2.jpeg',
  'caja-decorativa3.jpeg',
  'cuadro-campesinito-oleos.png',
  'cuadro-carro.jpeg',
  'cuadro-jesus.jpeg',
  'cuadro-oleo-mujer-estilo1.png',
  'cuadro-oleo-mujer-estilo2.png',
  'cuadro-oleos-copa-cerezas.png',
  'cuadro-oleos-saxofonista.png',
  'cuadro-papanoel.jpeg',
  'cuadro-retablo-floreros-oleos-triptico.png',
  'cuadro-retablo-personalizable1.png',
  'cuadro-retablo-personalizable2.png',
  'cuadro-virgen-guadalupe.png',
  'cuadro-virgen.png',
  'Florero-estilo-navideño.png',
  'florero-estilo-rustico.png',
  'Papa_Noel.png',
  'retablo-jarrones.png',
  'retablo-madera-frutas.png',
  'retablo-oleos-mujer-abstracta.png',
  'retablo-oleos-muñeco-nieve1.png',
  'retablo-oleos-muñeco-nieve2.png',
  'retablo-personalizable-esilo3.png',
  'retablo-personalizable-estilo4.png',
  'retablos-personalizables.jpeg',
]

const emptyForm: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  category: 'Cuadros',
  description: '',
  image: '',
  emoji: '🎨',
}

const SEED_PRODUCTS: Omit<Product, 'id'>[] = [
  { name: 'Cuadro Campesinito al Óleo', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-campesinito-oleos.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Óleo Mujer', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleo-mujer-estilo1.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Óleo Copa de Cerezas', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleos-copa-cerezas.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Óleo Saxofonista', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-oleos-saxofonista.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Virgen de Guadalupe', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-virgen-guadalupe.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Virgen', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-virgen.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Jesús', price: 0, category: 'Cuadros', emoji: '✝️', image: '/productos/cuadro-jesus.jpeg', description: 'Descripción pendiente.' },
  { name: 'Cuadro El Carro', price: 0, category: 'Cuadros', emoji: '🎨', image: '/productos/cuadro-carro.jpeg', description: 'Descripción pendiente.' },
  { name: 'Retablo Floreros Tríptico al Óleo', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/cuadro-retablo-floreros-oleos-triptico.png', description: 'Descripción pendiente.' },
  { name: 'Retablo Personalizable', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/cuadro-retablo-personalizable1.png', description: 'Descripción pendiente.' },
  { name: 'Retablo Jarrones', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-jarrones.png', description: 'Descripción pendiente.' },
  { name: 'Retablo Madera con Frutas', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-madera-frutas.png', description: 'Descripción pendiente.' },
  { name: 'Retablo Óleo Mujer Abstracta', price: 0, category: 'Retablos', emoji: '🖼️', image: '/productos/retablo-oleos-mujer-abstracta.png', description: 'Descripción pendiente.' },
  { name: 'Florero Estilo Rústico', price: 0, category: 'Decoración', emoji: '🌿', image: '/productos/florero-estilo-rustico.png', description: 'Descripción pendiente.' },
  { name: 'Alfiletero Artesanal', price: 0, category: 'Decoración', emoji: '🪡', image: '/productos/alfiletero.png', description: 'Descripción pendiente.' },
  { name: 'Caja Decorativa', price: 0, category: 'Decoración', emoji: '🎁', image: '/productos/caja-decorativa.jpeg', description: 'Descripción pendiente.' },
  { name: 'Florero Navideño', price: 0, category: 'Navidad', emoji: '🎄', image: '/productos/Florero-estilo-navideño.png', description: 'Descripción pendiente.' },
  { name: 'Papa Noel Decorativo', price: 0, category: 'Navidad', emoji: '🎅', image: '/productos/Papa_Noel.png', description: 'Descripción pendiente.' },
  { name: 'Retablo Muñeco de Nieve', price: 0, category: 'Navidad', emoji: '⛄', image: '/productos/retablo-oleos-muñeco-nieve1.png', description: 'Descripción pendiente.' },
  { name: 'Cuadro Papa Noel', price: 0, category: 'Navidad', emoji: '🎅', image: '/productos/cuadro-papanoel.jpeg', description: 'Descripción pendiente.' },
]

export default function Dashboard() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [importing, setImporting] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) {
        router.replace('/admin')
      } else {
        setAuthChecked(true)
        loadProducts()
      }
    })
    return () => unsub()
  }, [router])

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'))
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product))
    setProducts(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), { ...form })
        setMsg('Producto actualizado.')
      } else {
        await addDoc(collection(db, 'products'), { ...form })
        setMsg('Producto creado.')
      }
      setForm(emptyForm)
      setEditingId(null)
      await loadProducts()
    } catch {
      setMsg('Error al guardar el producto.')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const handleImport = async () => {
    if (!confirm(`¿Importar los ${SEED_PRODUCTS.length} productos a Firestore? Solo hacé esto una vez.`)) return
    setImporting(true)
    try {
      const batch = writeBatch(db)
      SEED_PRODUCTS.forEach(p => {
        const ref = doc(collection(db, 'products'))
        batch.set(ref, p)
      })
      await batch.commit()
      setMsg(`✓ ${SEED_PRODUCTS.length} productos importados correctamente.`)
      await loadProducts()
    } catch {
      setMsg('Error al importar los productos.')
    } finally {
      setImporting(false)
      setTimeout(() => setMsg(''), 4000)
    }
  }

  const handleEdit = (p: Product) => {
    setEditingId(p.id!)
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      image: p.image,
      emoji: p.emoji,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    await deleteDoc(doc(db, 'products', id))
    await loadProducts()
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin')
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Verificando sesión...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg italic" style={{ fontFamily: 'Georgia, serif' }}>
          L&apos;artesanait — Admin
        </h1>
        <button
          onClick={handleLogout}
          className="text-zinc-400 hover:text-white text-sm transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* Importar productos */}
        {products.length === 0 && (
          <section className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center">
            <p className="text-zinc-300 font-semibold mb-2">Firestore está vacío</p>
            <p className="text-zinc-500 text-sm mb-5">
              Importá todos los productos actuales de una sola vez para empezar.
            </p>
            <button
              onClick={handleImport}
              disabled={importing}
              className="bg-white text-zinc-900 font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors text-sm disabled:opacity-60"
            >
              {importing ? 'Importando...' : `Importar ${SEED_PRODUCTS.length} productos`}
            </button>
            {msg && <p className="text-green-400 text-sm mt-3">{msg}</p>}
          </section>
        )}

        {/* Formulario */}
        <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold mb-6">
            {editingId ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nombre</label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Precio (COP)</label>
              <input
                required
                type="number"
                min={0}
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Categoría</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Emoji</label>
              <input
                value={form.emoji}
                onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">Imagen</label>
              <select
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: `/productos/${e.target.value}` }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="">— Seleccioná una imagen —</option>
                {AVAILABLE_IMAGES.map(img => (
                  <option key={img} value={img}>{img}</option>
                ))}
              </select>
              {form.image && (
                <p className="text-xs text-zinc-500 mt-1">Seleccionada: {form.image}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">Descripción</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500 resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex gap-3 items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-zinc-900 font-semibold px-6 py-2 rounded-lg hover:bg-zinc-100 transition-colors text-sm disabled:opacity-60"
              >
                {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear producto'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm(emptyForm) }}
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Cancelar
                </button>
              )}
              {msg && <p className="text-green-400 text-sm">{msg}</p>}
            </div>
          </form>
        </section>

        {/* Lista de productos */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Productos ({products.length})</h2>
          {products.length === 0 ? (
            <p className="text-zinc-500 text-sm">No hay productos aún. Creá el primero arriba.</p>
          ) : (
            <div className="space-y-3">
              {products.map(p => (
                <div
                  key={p.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex items-center gap-4"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{p.name}</p>
                    <p className="text-zinc-500 text-xs">{p.category} · ${p.price.toLocaleString('es-CO')}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-zinc-400 hover:text-white text-xs transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id!)}
                      className="text-red-500 hover:text-red-400 text-xs transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
