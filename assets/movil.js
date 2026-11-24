// Kravata Travel · piezas del celular propio (hasta 760 px). Corre después de site.js.
(() => {
  // se arma una sola vez: al cargar si ya es celular, o cuando la ventana baja de 760 px
  const mq = matchMedia('(max-width: 760px)');
  const armar = () => {
  const K = window.KRAVATA, C = K.contacto, PAQ = window.KRAVATA_PAQUETES;
  const pagina = document.body.dataset.pagina;
  const wa = t => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ico = {
    buscar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z"/></svg>'
  };

  // ---------- inicio ----------
  if (pagina === 'inicio') {
    const h1 = document.getElementById('titulo-portada');
    h1.innerHTML = `${esc(h1.textContent)} <span class="tono">Argentina, Croacia y más.</span>`;

    // la consulta: una píldora que abre una hoja a pantalla completa
    const form = document.getElementById('buscador');
    const pild = document.createElement('button');
    pild.type = 'button'; pild.className = 'pildora';
    pild.innerHTML = `${ico.buscar}<span>¿A dónde querés viajar?</span><i>${ico.flecha}</i>`;
    form.before(pild);
    form.insertAdjacentHTML('afterbegin', `<div class="hoja__cabeza"><b>Armá tu consulta</b><button class="hoja__cerrar" type="button" aria-label="Cerrar">${ico.cerrar}</button></div>
      <p class="hoja__ayuda">Elegí el viaje, la salida y cuántos son. Te llega por WhatsApp y te respondo yo.</p>`);
    const abrir = () => { document.body.classList.add('hoja-abierta'); form.setAttribute('role', 'dialog'); form.setAttribute('aria-modal', 'true'); setTimeout(() => form.querySelector('.sel__boton')?.focus(), 50); };
    const cerrar = () => { document.body.classList.remove('hoja-abierta'); pild.focus(); };
    pild.addEventListener('click', abrir);
    form.querySelector('.hoja__cerrar').addEventListener('click', cerrar);
    addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('hoja-abierta') && !document.querySelector('.esta-abierto')) cerrar(); });
    window.kravataAbrirConsulta = abrir;
    if (location.hash === '#consulta') abrir();

    // el video queda como una foto con margen, debajo de la búsqueda, con la firma de la agencia
    const fondo = document.querySelector('.portada__fondo');
    pild.after(fondo);
    fondo.insertAdjacentHTML('beforeend', `<div class="portada__pie"><div><b>Del otro lado hay una persona.</b><small>Escribís por WhatsApp y te respondo yo.</small></div></div>`);

    // regiones en 2 × 2, en lugar de la vitrina y la lista grande
    const regiones = K.regiones.map(r => `<a class="region-m" href="destinos.html#${r.id}"><img src="img/chicas/${r.foto[0]}.jpg" alt="" loading="lazy"><span>${esc(r.nombre)}<small>${r.slugs.filter(s => PAQ.some(p => p.slug === s)).length} viajes</small></span></a>`).join('');
    document.querySelector('.portada').insertAdjacentHTML('afterend', `<section class="seccion" aria-labelledby="t-regiones-m">
      <div class="envase"><div class="seccion__cabeza"><h2 id="t-regiones-m">A dónde vamos</h2><a class="link" href="destinos.html">Ver todos</a></div>
      <div class="regiones-m">${regiones}</div>
      <p class="regiones-m__pie">¿No está el tuyo? <a class="link" href="presupuesto.html">Lo armamos a medida</a></p></div></section>`);

    // la verdad del precio: el ejemplo se abre si lo pedís
    const verdad = document.querySelector('.verdad');
    const ver = document.createElement('button');
    ver.type = 'button'; ver.className = 'btn btn--claro ver-ejemplo'; ver.setAttribute('aria-expanded', 'false'); ver.textContent = 'Ver el ejemplo';
    verdad.querySelector('.btn--claro').after(ver);
    verdad.querySelector('.btn--claro').className = 'btn btn--borde-claro';
    ver.addEventListener('click', () => { const on = verdad.classList.toggle('ver-ticket'); ver.setAttribute('aria-expanded', on); ver.textContent = on ? 'Ocultar el ejemplo' : 'Ver el ejemplo'; });
  }

  // ---------- ficha: contador de la galería ----------
  if (pagina === 'paquete') {
    const g = document.getElementById('galeria'), n = g ? g.children.length : 0;
    if (n > 1) {
      g.insertAdjacentHTML('afterend', `<span class="galeria__cuenta" aria-hidden="true">1 / ${n}</span>`);
      const c = g.nextElementSibling;
      g.addEventListener('scroll', () => { c.textContent = `${Math.round(g.scrollLeft / g.clientWidth) + 1} / ${n}`; }, { passive: true });
    }
  }

  // ---------- barra fija: Destinos y Consultar ----------
  if (!document.getElementById('barra-precio')) {
    const barra = document.createElement('nav');
    barra.className = 'barra-movil'; barra.setAttribute('aria-label', 'Acciones');
    const consultar = pagina === 'inicio'
      ? `<button class="btn" type="button" id="barra-consultar">${ico.wa}Consultar</button>`
      : `<a class="btn" href="index.html#consulta">${ico.wa}Consultar</a>`;
    barra.innerHTML = `<a class="btn btn--borde" href="destinos.html">Destinos</a>${consultar}`;
    document.body.append(barra);
    document.getElementById('barra-consultar')?.addEventListener('click', () => window.kravataAbrirConsulta());
  }
  };
  if (mq.matches) armar();
  else mq.addEventListener('change', function una(e) { if (e.matches) { mq.removeEventListener('change', una); armar(); } });
})();
