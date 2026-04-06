export default function ServicioAlCliente() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Encabezado */}
      <section className="bg-linear-to-r from-zinc-950 to-zinc-900 text-white py-16 text-center">
        <span className="text-zinc-400 text-sm tracking-[0.3em] uppercase">❖ Atención ❖</span>
        <h1
          className="text-4xl font-bold mt-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Servicio al Cliente
        </h1>
        <p className="text-zinc-400 mt-3 text-sm">
          Estamos para ayudarte en todo lo que necesités
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Tarjetas informativas */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              emoji: '📦',
              title: 'Envíos',
              info: 'Enviamos a todo el país. 3–7 días hábiles a domicilio. Retiro en taller disponible en CABA.',
            },
            {
              emoji: '🔄',
              title: 'Cambios',
              info: 'Tenés 10 días para realizar cambios. Artículos personalizados sin posibilidad de cambio.',
            },
            {
              emoji: '💳',
              title: 'Pagos',
              info: 'Aceptamos tarjeta de crédito/débito, transferencia bancaria y efectivo presencial.',
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 text-center"
            >
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <h3 className="font-bold text-zinc-900 mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Preguntas frecuentes */}
        <h2
          className="text-2xl font-bold text-zinc-900 mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-4 mb-16">
          {[
            {
              q: '¿Las piezas son realmente únicas?',
              a: 'Sí. Cada artículo está hecho a mano y aunque tengamos diseños recurrentes, nunca salen dos piezas exactamente iguales.',
            },
            {
              q: '¿Puedo encargar una pieza personalizada?',
              a: 'Por supuesto. Contactanos por WhatsApp o email contándonos qué tenés en mente. Aceptamos encargos con seña del 50%.',
            },
            {
              q: '¿Cuánto tarda un encargo personalizado?',
              a: 'Depende de la complejidad. El tiempo promedio es de 2 a 4 semanas. Te mantenemos informado del progreso.',
            },
            {
              q: '¿Cómo llega el paquete?',
              a: 'Usamos embalaje especial para proteger cada pieza. Llegan en cajita con papel kraft y un mensaje personalizado si lo pedís.',
            },
            {
              q: '¿Qué pasa si mi pedido llega dañado?',
              a: 'Escribinos dentro de las 48 hs con una foto del daño y lo resolvemos sin costo. Tu satisfacción es nuestra prioridad.',
            },
          ].map(faq => (
            <div
              key={faq.q}
              className="bg-white rounded-xl p-5 border border-zinc-100 shadow-sm"
            >
              <h3 className="font-semibold text-zinc-900 mb-2">{faq.q}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Sección contacto */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Tenés otra consulta?
          </h2>
          <p className="text-zinc-400 mb-8 text-sm sm:text-base">
            Escribinos y te respondemos en menos de 24 hs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hola@lartesanait.com"
              className="flex items-center gap-2 justify-center bg-white text-zinc-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-zinc-100 transition-colors"
            >
              📧 hola@lartesanait.com
            </a>
            <a
              href="https://wa.me/549XXXXXXXXXX"
              className="flex items-center gap-2 justify-center bg-zinc-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-zinc-600 transition-colors border border-zinc-600"
            >
              💬 Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
