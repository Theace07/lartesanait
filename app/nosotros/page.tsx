export default function Nosotros() {
  return (
    <div className="bg-zinc-50">
      {/* Encabezado */}
      <section className="bg-linear-to-r from-zinc-950 to-zinc-900 text-white py-20 text-center">
        <span className="text-zinc-400 text-sm tracking-[0.3em] uppercase">❖ Quiénes somos ❖</span>
        <h1
          className="text-4xl font-bold mt-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Nuestra Historia
        </h1>
      </section>

      {/* Historia */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-2xl font-bold text-zinc-900 mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Hechas con amor desde 2020
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              L&apos;artesanait nació de la pasión por el arte manual y la necesidad de crear algo
              único en un mundo lleno de productos en serie. Cada pieza que hacemos lleva tiempo,
              dedicación y una historia.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-8">
              Trabajamos con materiales naturales y técnicas artesanales transmitidas de generación
              en generación, adaptándolas a diseños modernos que hablan al corazón.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { number: '500+', label: 'Piezas creadas' },
                { number: '300+', label: 'Clientes felices' },
                { number: '4', label: 'Años de amor' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-zinc-200">
                  <p className="text-2xl font-bold text-zinc-900">{stat.number}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-linear-to-br from-zinc-200 to-zinc-100 rounded-3xl h-80 flex items-center justify-center text-8xl shadow-inner">
            🎨
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-zinc-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2
            className="text-2xl font-bold text-zinc-900 text-center mb-10"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestros valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🌿',
                title: 'Sostenibilidad',
                desc: 'Materiales naturales y procesos responsables con el medio ambiente.',
              },
              {
                emoji: '❤️',
                title: 'Pasión',
                desc: 'Cada pieza es creada con amor y dedicación desde el primer boceto.',
              },
              {
                emoji: '✨',
                title: 'Unicidad',
                desc: 'No existen dos piezas iguales. Tu compra es única en el mundo.',
              },
            ].map(v => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-zinc-200"
              >
                <span className="text-4xl block mb-3">{v.emoji}</span>
                <h3 className="font-bold text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso artesanal */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          className="text-2xl font-bold text-zinc-900 text-center mb-10"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Nuestro proceso
        </h2>
        <div className="grid sm:grid-cols-4 gap-6 text-center">
          {[
            { emoji: '💡', step: '01', title: 'Inspiración', desc: 'Diseñamos cada pieza pensando en quien la va a recibir.' },
            { emoji: '🛠️', step: '02', title: 'Creación', desc: 'Trabajamos a mano con herramientas artesanales.' },
            { emoji: '🎨', step: '03', title: 'Acabado', desc: 'Pintamos, texturizamos y finalizamos con detalle.' },
            { emoji: '📦', step: '04', title: 'Envío', desc: 'Embalaje especial para que llegue perfecta a tu puerta.' },
          ].map(step => (
            <div key={step.step} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center text-2xl mb-3">
                {step.emoji}
              </div>
              <span className="text-xs font-bold text-zinc-400 tracking-widest mb-1">{step.step}</span>
              <h3 className="font-bold text-zinc-900 mb-1">{step.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
