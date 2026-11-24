// Kravata Travel · preview · encabezado, pie, tarjetas y las cuatro páginas.
(function () {
  const K = window.KRAVATA;
  const SVG = window.KRAVATA_SVG;
  // los paquetes vencidos (data-vence en la web actual) salen de los listados, pero su ficha sigue abierta
  const TODOS = window.KRAVATA_PAQUETES;
  const hoyISO = new Date().toISOString().slice(0, 10);
  const PAQ = TODOS.filter(p => !p.vence || p.vence >= hoyISO);
  const porSlug = Object.fromEntries(PAQ.map(p => [p.slug, p]));
  const porSlugTodos = Object.fromEntries(TODOS.map(p => [p.slug, p]));
  const SITIO = window.KRAVATA.sitio || { preview: true, rutasFijas: false };
  // en la web real cada paquete tiene su página fija (paquetes/<slug>.html); en la preview, paquete.html?p=<slug>
  const urlPaq = s => SITIO.rutasFijas ? `paquetes/${s}.html` : `paquete.html?p=${s}`;
  const C = K.contacto;

  // ---------- íconos (trazos simples, sin avión, globo, pin ni valija) ----------
  const I = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    menos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"/></svg>',
    cruz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    mas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.2 3.7c1.56.68 2.18.73 2.96.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    casa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-6 8 6v8.5a.5.5 0 0 1-.5.5H15v-6H9v6H4.5a.5.5 0 0 1-.5-.5V11Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.3 1.7 3.8 4 4v3.1a7.3 7.3 0 0 1-4-1.2v6.2A6 6 0 1 1 10.6 9v3.2a2.9 2.9 0 1 0 2.9 2.9V3h3.1Z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>'
  };

  const svgRombo = SVG['simbolo-macizo'];
  // guarda: el símbolo simplificado repetido, como fondo
  const guardaURL = color => 'url("data:image/svg+xml;utf8,' + encodeURIComponent(SVG['simbolo-simple'].replace(/currentColor/g, color)) + '")';
  document.documentElement.style.setProperty('--guarda-celeste', guardaURL('#12233D'));

  const wa = texto => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(texto)}`;
  const precioNum = p => (p.precio.match(/USD\s*([\d.]+)/) || [])[1] || '';
  const diasCorto = p => (p.dest.split('·').slice(1).join('·') || '').trim();
  const foto = (slug, i = 0) => (K.fotos[slug] || [])[i];
  const region = slug => K.regiones.find(r => r.slugs.includes(slug));
  const esPromo = slug => K.promos.items.find(x => x.slug === slug);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- encabezado y pie ----------
  const pagina = document.body.dataset.pagina;
  const sobreFoto = document.body.dataset.cabecera === 'sobre';
  const enlaces = [
    ['destinos.html', 'Destinos', 'destinos'],
    ['destinos.html#promos', 'Promos', ''],
    ['index.html#como-funciona', 'Cómo funciona', ''],
    ['nosotros.html', 'Nosotros', 'nosotros'],
    ['presupuesto.html', 'Presupuesto', 'presupuesto']
  ];
  const cab = document.createElement('header');
  cab.className = 'cabecera' + (sobreFoto ? ' cabecera--sobre' : '');
  cab.innerHTML = `
    <div class="envase cabecera__fila">
      <a class="logo" href="index.html" aria-label="Kravata Travel, inicio">${SVG['logo-horizontal']}</a>
      <nav aria-label="Principal"><ul class="menu">${enlaces.map(([h, t, id]) => `<li><a href="${h}"${id && id === pagina ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul></nav>
      <a class="btn" href="${wa('Hola, quiero consultar por un viaje.')}" target="_blank" rel="noopener">${I.wa}Escribinos</a>
      <button class="hamburguesa" type="button" aria-expanded="false" aria-controls="panel-menu" aria-label="Abrir menú"><span></span><span></span><span></span></button>
    </div>`;
  const panel = document.createElement('div');
  panel.className = 'panel-menu'; panel.id = 'panel-menu';
  panel.innerHTML = enlaces.map(([h, t], n) => `<a href="${h}" style="--i:${n}">${t}</a>`).join('') +
    `<a class="btn btn--ancho" href="${wa('Hola, quiero consultar por un viaje.')}" target="_blank" rel="noopener">${I.wa}Escribinos por WhatsApp</a>`;
  const saltar = document.createElement('a');
  saltar.className = 'saltar'; saltar.href = location.href.split('#')[0] + '#contenido'; saltar.textContent = 'Saltar al contenido';
  document.body.prepend(saltar, cab, panel);
  const ham = cab.querySelector('.hamburguesa');
  ham.addEventListener('click', () => {
    const abierto = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', String(!abierto));
    ham.setAttribute('aria-label', abierto ? 'Abrir menú' : 'Cerrar menú');
    panel.classList.toggle('abierto', !abierto);
    cab.classList.toggle('es-flotante', !abierto || scrollY > 40);
    document.body.style.overflow = abierto ? '' : 'hidden';
  });
  panel.addEventListener('click', e => { if (e.target.closest('a')) ham.click(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('abierto')) { ham.click(); ham.focus(); } });
  const alScroll = () => {
    if (!panel.classList.contains('abierto')) cab.classList.toggle('es-flotante', scrollY > 40);
  };
  addEventListener('scroll', alScroll, { passive: true }); alScroll();

  const pie = document.createElement('footer');
  pie.className = 'pie';
  pie.innerHTML = `
    <div class="envase">
      <div class="pie__arriba">
        <div class="pie__marca">
          <span class="logo" aria-label="Kravata Travel">${SVG['logo-horizontal']}</span>
          <p>Agencia de viajes 100 % online, de La Plata. Especialistas en Argentina y Croacia. Del otro lado del WhatsApp hay una persona, no una central.</p>
          <div class="redes">
            <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram @kravata.travel">${I.ig}</a>
            <a href="${C.tiktok}" target="_blank" rel="noopener" aria-label="TikTok @kravata.travel">${I.tt}</a>
            <a href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook de Kravata Travel">${I.fb}</a>
          </div>
        </div>
        <div><h2>Destinos</h2><ul>${K.regiones.map(r => `<li><a href="destinos.html#${r.id}">${r.nombre}</a></li>`).join('')}<li><a href="presupuesto.html">A medida</a></li></ul></div>
        <div><h2>Kravata</h2><ul><li><a href="index.html#como-funciona">Cómo funciona</a></li><li><a href="nosotros.html">Nosotros</a></li><li><a href="guia-croacia.html">Guía de Croacia</a></li><li><a href="${C.terminos}">Términos y condiciones</a></li><li><a href="${C.defensaConsumidor}" target="_blank" rel="noopener">Defensa del Consumidor</a></li></ul></div>
        <div><h2>Contacto</h2><ul>
          <li><a href="${wa('Hola, quiero consultar por un viaje.')}" target="_blank" rel="noopener">WhatsApp ${C.whatsappVisible}</a></li>
          <li><a href="mailto:${C.mail}">${C.mail}</a></li>
          <li>${C.horario}</li></ul></div>
      </div>
      <div class="pie__legal">
        <div>
          <p>Kravata Travel · ${C.titular} · CUIT ${C.cuit} · ${C.domicilio}</p>
          <p>Defensa del Consumidor: <a href="${C.defensaConsumidor}" target="_blank" rel="noopener">para reclamos ingresá acá</a> · Línea gratuita 0800-666-1518 · Precios por persona, sujetos a disponibilidad.</p>
          ${SITIO.preview ? '<p>Preview de diseño. Fotos provisorias de Unsplash.</p>' : ''}
        </div>
        <a class="btn-arrepentimiento" href="${C.arrepentimiento}">Botón de arrepentimiento</a>
      </div>
    </div>`;
  document.body.append(pie);

  const flot = document.createElement('a');
  flot.className = 'flotante'; flot.target = '_blank'; flot.rel = 'noopener';
  flot.href = wa('Hola, quiero consultar por un viaje.');
  flot.innerHTML = `${I.wa}<span>WhatsApp</span>`;
  flot.setAttribute('aria-label', 'Escribinos por WhatsApp');
  document.body.append(flot);
  // el botón flotante se esconde sobre el pie, para no tapar el botón de arrepentimiento
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => flot.classList.toggle('oculto', e.isIntersecting)).observe(pie);

  // ---------- piezas ----------
  const incluyeHTML = p => '<ul class="incluye">' + p.badges.map(b =>
    `<li class="${b.si ? '' : 'no'}">${b.si ? I.check : I.menos}${esc(b.t)}</li>`).join('') + '</ul>';

  // un solo dato por tarjeta: el recorrido, o lo principal que incluye si no hay programa día por día
  const datoDe = p => {
    if (p.itinerario.length) {
      const lugares = [];
      p.itinerario.forEach(d => (d.d.split('·')[1] || '').split(/[–-]/).forEach(x => {
        x = x.trim(); const base = x.replace(/\s*\(.*\)/, '');
        if (x && !/salida|llegada|arribo|regreso|traslado/i.test(x) && !lugares.some(l => l.replace(/\s*\(.*\)/, '') === base)) lugares.push(x);
      }));
      return ['Recorrido', lugares.slice(0, 4).join(', ') + (lugares.length > 4 ? '…' : '')];
    }
    const corto = t => t.replace(/\s*\(.*$/, '').split(',')[0].trim();
    const hotel = p.incluye.find(t => /noches/i.test(t));
    const extra = p.incluye.find(t => /excursi|city tour/i.test(t));
    return ['Incluye', [hotel, extra].filter(Boolean).map(corto).join(' · ')];
  };

  const tarjeta = p => {
    const f = foto(p.slug) || ['', p.titulo];
    const promo = esPromo(p.slug);
    const salida = (p.mini.match(/salida (.+)$/) || [])[1] || '';
    const [et, dato] = datoDe(p);
    return `<article class="tarjeta">
      <div class="tarjeta__foto">
        ${promo ? `<span class="etiqueta etiqueta--promo">${svgRombo}${esc(promo.etiqueta)}</span>` : ''}
        <img src="img/chicas/${f[0]}.jpg" alt="${esc(f[1])}" loading="lazy" width="800" height="600">
      </div>
      <div class="tarjeta__cuerpo">
        <h3><a href="${urlPaq(p.slug)}">${esc(p.titulo)}</a></h3>
        <p class="tarjeta__dias">${esc(p.etiqueta)} · ${esc(diasCorto(p))}</p>
        ${incluyeHTML(p)}
        <p class="tarjeta__dato"><b>${et}:</b> ${esc(dato)}</p>
        <div class="tarjeta__precio"><span>Desde</span> <b>USD ${precioNum(p)}</b>
          <small>Por persona, base doble${salida ? ` · sale el ${esc(salida)}` : ''}</small></div>
      </div>
    </article>`;
  };

  // revelado suave al bajar: lo que ya está a la vista aparece apenas carga la página
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!quieto) document.documentElement.classList.add('anima');
  const io = !quieto && 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -6% 0px', threshold: 0 }) : null;
  const observar = () => {
    document.querySelectorAll('main .seccion__cabeza, main .fila:not(#fila-categoria):not(#vitrina-fila), .pasos > li, .sin, .verdad > *, .respondo, .presupuesto > *, .region-bloque, .ficha section, .caja-precio, .cabeza-pagina, .presenta__texto, .presenta__collage, .adonde__lista')
      .forEach(el => {
        if (el.classList.contains('revela') || el.closest('.portada')) return;
        el.classList.add('revela');
        const hermanos = el.parentElement ? [...el.parentElement.children].filter(x => x.classList.contains('revela')) : [];
        el.style.setProperty('--i', Math.min(hermanos.indexOf(el), 4));
        io ? io.observe(el) : el.classList.add('visto');
      });
  };


  // ---------- desplazador de filas: dentro del contenedor, flechas a los costados, bordes difuminados ----------
  const prepararFila = fila => {
    if (!fila) return;
    if (!fila._lista) {
      fila._lista = true;
      const marco = document.createElement('div');
      marco.className = 'fila-marco';
      fila.before(marco); marco.append(fila);
      const flechas = [-1, 1].map(dir => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'fila-flecha fila-flecha--' + (dir < 0 ? 'izq' : 'der'); b.dataset.dir = dir;
        b.setAttribute('aria-label', dir < 0 ? 'Ver anteriores' : 'Ver siguientes'); b.innerHTML = I.chevron;
        b.addEventListener('click', () => fila.scrollBy({ left: ((parseFloat(getComputedStyle(fila).getPropertyValue('--w')) || fila.clientWidth) + 20) * dir, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
        marco.append(b); return b;
      });
      const avance = document.createElement('div');
      avance.className = 'fila-avance'; avance.setAttribute('aria-hidden', 'true'); avance.innerHTML = '<span></span>';
      marco.after(avance);
      const barra = avance.firstChild;
      fila._estado = () => {
        const max = fila.scrollWidth - fila.clientWidth, sl = fila.scrollLeft;
        const izq = sl > 2, der = sl < max - 2;
        fila.classList.toggle('hay-izq', izq); fila.classList.toggle('hay-der', der);
        flechas[0].classList.toggle('es-visible', izq); flechas[1].classList.toggle('es-visible', der);
        flechas[0].tabIndex = izq ? 0 : -1; flechas[1].tabIndex = der ? 0 : -1;
        avance.hidden = max <= 2;
        const prop = fila.clientWidth / fila.scrollWidth;
        barra.style.width = (prop * 100) + '%';
        barra.style.transform = `translateX(${max > 0 ? (sl / max) * ((1 / prop) - 1) * 100 : 0}%)`;
      };
      fila.addEventListener('scroll', () => requestAnimationFrame(fila._estado), { passive: true });
      // arrastre con el mouse (en pantallas táctiles se desliza con el dedo)
      let x0 = 0, s0 = 0, movio = false, activo = false;
      fila.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; activo = true; movio = false; x0 = e.clientX; s0 = fila.scrollLeft; });
      addEventListener('pointermove', e => { if (!activo) return; const dx = e.clientX - x0; if (!movio && Math.abs(dx) > 6) { movio = true; fila.classList.add('arrastrando'); } if (movio) fila.scrollLeft = s0 - dx; });
      addEventListener('pointerup', () => {
        if (!activo) return; activo = false;
        if (movio) { const l = fila.scrollLeft; fila.classList.remove('arrastrando'); fila.scrollLeft = l; fila.scrollTo({ left: l, behavior: 'smooth' }); }
      });
      fila.addEventListener('click', e => { if (movio) { e.preventDefault(); e.stopPropagation(); movio = false; } }, true);
      fila.addEventListener('dragstart', e => e.preventDefault());
    }
    // la fila ocupa el ancho del contenedor (no de la pantalla); el aire lateral deja lugar a la sombra
    const envase = fila.closest('.envase') || fila.parentElement, cs = getComputedStyle(envase);
    const aire = parseFloat(cs.paddingLeft) || 16;
    fila.style.setProperty('--izq', aire + 'px'); fila.style.setProperty('--der', aire + 'px');
    fila.style.setProperty('--w', (envase.clientWidth - 2 * aire) + 'px');
    fila._estado();
  };
  const prepararFilas = () => document.querySelectorAll('.fila').forEach(prepararFila);
  addEventListener('resize', () => requestAnimationFrame(prepararFilas));
  addEventListener('load', prepararFilas);


  // ---------- selector propio: una sola forma de abrir opciones en toda la web ----------
  let abierto = null;
  const cerrarAbierto = (devolverFoco) => { if (abierto) { const a = abierto; abierto = null; a.cerrar(devolverFoco); } };
  document.addEventListener('click', e => { if (abierto && !abierto.raiz.contains(e.target)) cerrarAbierto(false); });
  let idSel = 0;

  // opciones: [{ grupo, items: [{ valor, texto, nota }] }]
  const selector = (host, { name, etiqueta, vacio, opciones, valor = '', alCambiar }) => {
    const id = 'sel' + (++idSel);
    const todas = opciones.flatMap(g => g.items);
    host.classList.add('fld', 'sel');
    host.innerHTML = `
      <span class="fld__etiqueta" id="${id}-e">${esc(etiqueta)}</span>
      <button type="button" class="sel__boton" id="${id}-b" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}-p" aria-labelledby="${id}-e ${id}-v">
        <span class="sel__valor" id="${id}-v"></span>${I.chevron}</button>
      <input type="hidden" name="${name}">
      <div class="sel__panel" id="${id}-p" role="listbox" tabindex="-1" aria-labelledby="${id}-e" hidden>
        ${opciones.map((g, gi) => `<div role="group" ${g.grupo ? `aria-labelledby="${id}-g${gi}"` : ''}>${g.grupo ? `<p class="sel__grupo" id="${id}-g${gi}">${esc(g.grupo)}</p>` : ''}
          ${g.items.map(o => `<div class="sel__opcion" role="option" id="${id}-o${todas.indexOf(o)}" aria-selected="false" data-valor="${esc(o.valor)}"><span>${esc(o.texto)}</span>${o.nota ? `<small>${esc(o.nota)}</small>` : ''}${I.check}</div>`).join('')}</div>`).join('')}
      </div>`;
    const boton = host.querySelector('.sel__boton'), panel = host.querySelector('.sel__panel'), oculto = host.querySelector('input');
    const vista = host.querySelector('.sel__valor'), ops = [...host.querySelectorAll('[role=option]')];
    let activa = -1;
    const fijar = (v, avisar) => {
      const o = todas.find(x => x.valor === v);
      oculto.value = o ? o.valor : '';
      vista.textContent = o ? o.texto : vacio; vista.classList.toggle('es-vacio', !o || !o.valor);
      ops.forEach(el => el.setAttribute('aria-selected', String(!!o && el.dataset.valor === oculto.value)));
      if (avisar && alCambiar) alCambiar(oculto.value);
    };
    const marcar = n => {
      activa = Math.max(0, Math.min(ops.length - 1, n));
      ops.forEach((el, x) => el.classList.toggle('es-activa', x === activa));
      panel.setAttribute('aria-activedescendant', ops[activa].id);
      ops[activa].scrollIntoView({ block: 'nearest' });
    };
    const api = {
      raiz: host,
      cerrar(foco) { panel.hidden = true; boton.setAttribute('aria-expanded', 'false'); host.classList.remove('esta-abierto'); if (foco) boton.focus(); }
    };
    const abrir = () => {
      cerrarAbierto(false); abierto = api;
      panel.hidden = false; boton.setAttribute('aria-expanded', 'true'); host.classList.add('esta-abierto');
      marcar(Math.max(0, ops.findIndex(el => el.dataset.valor === oculto.value)));
      panel.focus({ preventScroll: true });
    };
    boton.addEventListener('click', () => panel.hidden ? abrir() : cerrarAbierto(true));
    boton.addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); abrir(); } });
    panel.addEventListener('click', e => { const o = e.target.closest('[role=option]'); if (o) { fijar(o.dataset.valor, true); cerrarAbierto(true); } });
    panel.addEventListener('mousemove', e => { const o = e.target.closest('[role=option]'); if (o) marcar(ops.indexOf(o)); });
    panel.addEventListener('keydown', e => {
      const m = { ArrowDown: activa + 1, ArrowUp: activa - 1, Home: 0, End: ops.length - 1, PageDown: activa + 6, PageUp: activa - 6 };
      if (e.key in m) { e.preventDefault(); marcar(m[e.key]); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fijar(ops[activa].dataset.valor, true); cerrarAbierto(true); }
      else if (e.key === 'Escape') { e.preventDefault(); cerrarAbierto(true); }
      else if (e.key === 'Tab') cerrarAbierto(false);
      else if (e.key.length === 1) {
        const empieza = el => el.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase());
        let n = ops.findIndex((el, x) => x > activa && empieza(el)); if (n < 0) n = ops.findIndex(empieza); if (n >= 0) marcar(n);
      }
    });
    fijar(valor, false);
    return { fijar: v => fijar(v, false) };
  };

  // personas: adultos y menores, con más y menos
  const selectorPersonas = (host, { name, etiqueta }) => {
    const id = 'sel' + (++idSel);
    const v = { adultos: 2, menores: 0 };
    host.classList.add('fld', 'sel');
    host.innerHTML = `
      <span class="fld__etiqueta" id="${id}-e">${esc(etiqueta)}</span>
      <button type="button" class="sel__boton" aria-haspopup="dialog" aria-expanded="false" aria-controls="${id}-p" aria-labelledby="${id}-e ${id}-v"><span class="sel__valor" id="${id}-v"></span>${I.chevron}</button>
      <input type="hidden" name="${name}">
      <div class="sel__panel sel__panel--personas" id="${id}-p" role="dialog" aria-labelledby="${id}-e" hidden>
        ${[['adultos', 'Adultos', '12 años o más', 1, 9], ['menores', 'Menores', 'De 2 a 11 años', 0, 6]].map(([k, t, s, min, max]) => `
          <div class="contador" data-k="${k}" data-min="${min}" data-max="${max}">
            <div><b>${t}</b><small>${s}</small></div>
            <div class="contador__ctrl"><button type="button" data-d="-1" aria-label="Uno menos: ${t.toLowerCase()}">${I.menos}</button><output aria-live="polite"></output><button type="button" data-d="1" aria-label="Uno más: ${t.toLowerCase()}">${I.mas}</button></div>
          </div>`).join('')}
        <p class="sel__ayuda">Con menores, el precio se consulta.</p>
        <button type="button" class="btn btn--ancho sel__listo">Listo</button>
      </div>`;
    const boton = host.querySelector('.sel__boton'), panel = host.querySelector('.sel__panel'), oculto = host.querySelector('input'), vista = host.querySelector('.sel__valor');
    const pintar = () => {
      const t = `${v.adultos} ${v.adultos === 1 ? 'adulto' : 'adultos'}` + (v.menores ? ` y ${v.menores} ${v.menores === 1 ? 'menor' : 'menores'}` : '');
      vista.textContent = t; oculto.value = t;
      host.querySelectorAll('.contador').forEach(c => {
        const k = c.dataset.k; c.querySelector('output').textContent = v[k];
        c.querySelector('[data-d="-1"]').disabled = v[k] <= +c.dataset.min; c.querySelector('[data-d="1"]').disabled = v[k] >= +c.dataset.max;
      });
    };
    const api = { raiz: host, cerrar(foco) { panel.hidden = true; boton.setAttribute('aria-expanded', 'false'); host.classList.remove('esta-abierto'); if (foco) boton.focus(); } };
    boton.addEventListener('click', () => {
      if (!panel.hidden) return cerrarAbierto(true);
      cerrarAbierto(false); abierto = api; panel.hidden = false; boton.setAttribute('aria-expanded', 'true'); host.classList.add('esta-abierto');
      panel.querySelector('[data-d="1"]').focus();
    });
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-d]');
      if (b) { const c = b.closest('.contador'); v[c.dataset.k] = Math.max(+c.dataset.min, Math.min(+c.dataset.max, v[c.dataset.k] + +b.dataset.d)); pintar(); }
      if (e.target.closest('.sel__listo')) cerrarAbierto(true);
    });
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); cerrarAbierto(true); } });
    pintar();
  };

  const opcionesDestino = () => [
    ...K.regiones.map(r => ({ grupo: r.nombre, items: r.slugs.filter(s => porSlug[s]).map(s => ({ valor: porSlug[s].titulo, texto: porSlug[s].titulo, nota: 'USD ' + precioNum(porSlug[s]) })) })),
    { grupo: 'Otro', items: [{ valor: 'Otro destino, a medida', texto: 'Otro destino, a medida' }] }
  ];
  // fechas posibles de un paquete, según su vigencia: fija (Semana Santa), lista de salidas (Patagonia) o rango de meses
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const may = s => s[0].toUpperCase() + s.slice(1);
  const fechasDe = p => {
    const v = (p.precioModo.find(t => /vigencia/i.test(t)) || '');
    let m = v.match(/la salida del (\d+) al (\d+) de (\w+) de (\d{4})/);
    if (m) {
      const ss = /semana santa/i.test(p.titulo), fecha = `${m[1]} al ${m[2]} de ${m[3]} de ${m[4]}`;
      return { tipo: 'fija', texto: (ss ? 'Semana Santa: ' : '') + fecha, valor: fecha + (ss ? ' (Semana Santa)' : '') };
    }
    m = v.match(/las salidas del (.+?) de (\d{4})/);
    if (m) {
      const items = m[1].split(/, | y /).map(x => ({ valor: `${x} de ${m[2]}`, texto: may(x) }));
      return { tipo: 'lista', opciones: [{ grupo: `Salidas ${m[2]}`, items }], porDefecto: items[0].valor };
    }
    m = v.match(/en el mes cotizado \((\w+) de (\d{4})\)/);
    if (m) {
      const cot = (p.datos.find(x => /salida/i.test(x.k)) || {}).v || '';
      return { tipo: 'lista', opciones: [{ grupo: 'Tarifa cotizada', items: [{ valor: `${m[1]} de ${m[2]}`, texto: `${may(m[1])} de ${m[2]}`, nota: cot ? `salida ${cot}` : '' }] },
        { grupo: '', items: [{ valor: 'Otra fecha, a consultar', texto: 'Otra fecha, a consultar' }] }], porDefecto: `${m[1]} de ${m[2]}` };
    }
    m = v.match(/desde (\w+) (\d{4}) hasta (\w+) (\d{4})/);
    if (m) {
      const hoy = new Date(), sig = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
      let d = new Date(+m[2], MESES.indexOf(m[1]), 1); if (d < sig) d = sig;
      const fin = new Date(+m[4], MESES.indexOf(m[3]), 1);
      const cot = (p.datos.find(x => /salida/i.test(x.k)) || {}).v || '';     // «10 mar 2027»
      const grupos = [];
      for (; d <= fin; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) {
        const anio = String(d.getFullYear()), mes = MESES[d.getMonth()];
        let g = grupos.find(x => x.grupo === anio); if (!g) grupos.push(g = { grupo: anio, items: [] });
        const esCot = cot && cot.includes(mes.slice(0, 3)) && cot.endsWith(anio);
        g.items.push({ valor: `${mes} de ${anio}`, texto: may(mes), nota: esCot ? 'salida cotizada' : '' });
      }
      grupos.push({ grupo: '', items: [{ valor: 'Otra fecha, a consultar', texto: 'Otra fecha, a consultar' }] });
      return { tipo: 'rango', opciones: grupos };
    }
    return null;
  };
  const opcionesCuando = () => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    const grupos = [{ grupo: '', items: [{ valor: 'Lo antes posible', texto: 'Lo antes posible' }] }];
    for (let n = 1; n <= 13; n++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth() + n, 1), anio = String(d.getFullYear());
      let g = grupos.find(x => x.grupo === anio); if (!g) grupos.push(g = { grupo: anio, items: [] });
      const m = meses[d.getMonth()];
      g.items.push({ valor: `${m} de ${anio}`, texto: m[0].toUpperCase() + m.slice(1) });
    }
    grupos.push({ grupo: '', items: [{ valor: 'Todavía no sé', texto: 'Todavía no sé' }] });
    return grupos;
  };

  // los dos formularios (consulta rápida y presupuesto) salen de acá, iguales en todas las páginas
  const armarForm = (form, tipo) => {
    if (!form) return;
    const rapido = tipo === 'rapido';
    form.innerHTML = rapido
      ? `<div data-campo="destino"></div><div data-campo="fecha"></div><div data-campo="personas"></div>
         <button class="btn btn--claro" type="submit">${I.wa}Consultar</button>`
      : `<label class="fld"><span class="fld__etiqueta">Tu nombre</span><input name="nombre" autocomplete="given-name"></label>
         <div data-campo="destino"></div><div data-campo="fecha"></div><div data-campo="personas"></div>
         <label class="fld fld--ancho"><span class="fld__etiqueta">Algo más que debamos saber</span><textarea name="mas" rows="3"></textarea></label>
         <button class="btn" type="submit">${I.wa}Enviar por WhatsApp</button>
         <p class="form-pres__nota">Se abre WhatsApp con tu mensaje listo. No guardamos tus datos en la web.</p>`;
    const pre = new URLSearchParams(location.search).get('destino') || '';
    const hostFecha = form.querySelector('[data-campo=fecha]');
    const pintarCuando = destino => {
      cerrarAbierto(false);
      const p = PAQ.find(x => x.titulo === destino), f = p ? fechasDe(p) : null;
      hostFecha.className = '';
      if (f && f.tipo === 'fija') {
        // fecha fija: no hay nada que elegir, se muestra y viaja en el mensaje
        hostFecha.classList.add('fld', 'sel', 'sel--fija');
        hostFecha.innerHTML = `<span class="fld__etiqueta">Salida</span><span class="sel__valor">${esc(f.texto)}</span><input type="hidden" name="fecha" value="${esc(f.valor)}"><span class="sel__fija-nota">Fecha fija del paquete</span>`;
        return;
      }
      selector(hostFecha, f
        ? { name: 'fecha', etiqueta: 'Salida', vacio: f.tipo === 'lista' ? 'Elegí una salida' : 'Elegí un mes', opciones: f.opciones, valor: f.porDefecto || '' }
        : { name: 'fecha', etiqueta: 'Cuándo', vacio: 'Elegí un mes', opciones: opcionesCuando() });
    };
    selector(form.querySelector('[data-campo=destino]'), { name: 'destino', etiqueta: 'Destino', vacio: 'Elegí un destino', opciones: opcionesDestino(), valor: pre,
      alCambiar: v => { pintarCuando(v); const b = hostFecha.querySelector('.sel__boton'); if (b) b.focus({ preventScroll: true }); } });
    pintarCuando(pre);
    selectorPersonas(form.querySelector('[data-campo=personas]'), { name: 'personas', etiqueta: 'Personas' });
    const estado = document.createElement('p');
    estado.className = 'form-estado'; estado.setAttribute('role', 'status'); estado.setAttribute('aria-live', 'polite');
    form.append(estado);
    const campoDestino = form.querySelector('[data-campo=destino]');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      // hace falta saber a dónde: un destino elegido o, en el presupuesto, algo escrito
      if (!d.destino && !(d.mas || '').trim()) {
        campoDestino.classList.add('fld--error');
        campoDestino.querySelector('.sel__boton').setAttribute('aria-invalid', 'true');
        estado.className = 'form-estado es-error';
        estado.textContent = rapido ? 'Elegí un destino para consultar.' : 'Elegí un destino o contanos en el mensaje a dónde querés ir.';
        campoDestino.querySelector('.sel__boton').focus();
        return;
      }
      campoDestino.classList.remove('fld--error'); campoDestino.querySelector('.sel__boton').removeAttribute('aria-invalid');
      const lineas = [rapido ? 'Hola, quiero consultar por un viaje.' : 'Hola, quiero pedir un presupuesto.'];
      if (d.nombre) lineas.push(`Soy ${d.nombre}.`);
      const pq = PAQ.find(x => x.titulo === d.destino);
      if (d.destino) lineas.push(pq ? `Paquete: ${pq.titulo} (desde USD ${precioNum(pq)} por persona, base doble).` : `Destino: ${d.destino}.`);
      if (d.fecha) lineas.push(`${pq ? 'Salida' : 'Cuándo'}: ${d.fecha}.`);
      if (d.personas) lineas.push(`Personas: ${d.personas}.`);
      if (d.mas) lineas.push(d.mas);
      window.open(wa(lineas.join('\n')), '_blank', 'noopener');
      estado.className = 'form-estado es-ok';
      estado.innerHTML = `${I.check}<span>Listo: se abrió WhatsApp con tu mensaje. Si no se abrió, escribinos al <a href="${wa('Hola, quiero consultar por un viaje.')}" target="_blank" rel="noopener">${C.whatsappVisible}</a>.</span>`;
    });
    // al elegir un destino se va el aviso de error
    form.addEventListener('click', e => { if (e.target.closest('.sel__opcion') && campoDestino.contains(e.target)) { campoDestino.classList.remove('fld--error'); estado.textContent = ''; estado.className = 'form-estado'; } });
  };


  // ---------- R1 · vitrina de destinos ----------
  const vitrina = () => {
    const tabs = document.getElementById('vitrina-tabs'); if (!tabs) return;
    const img = document.getElementById('vitrina-img'), nombre = document.getElementById('vitrina-nombre'), bajada = document.getElementById('vitrina-bajada');
    const fila = document.getElementById('vitrina-fila');
    const R = K.regiones, DUR = 7000;
    tabs.innerHTML = R.map((r, n) => `<button type="button" role="tab" id="vt-${r.id}" aria-selected="${n === 0}" tabindex="${n === 0 ? 0 : -1}" aria-controls="vitrina-panel" data-n="${n}">
        <span class="vitrina__num">0${n + 1}</span><span class="vitrina__tab-nombre">${esc(r.nombre)}</span><span class="vitrina__avance"><i></i></span></button>`).join('');
    let actual = 0, timer = null, inicio = 0, pausado = false, enVista = false;
    const quietoV = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pintar = (n, foco) => {
      actual = n; const r = R[n];
      tabs.querySelectorAll('[role=tab]').forEach((b, x) => { b.setAttribute('aria-selected', String(x === n)); b.tabIndex = x === n ? 0 : -1; b.classList.remove('corriendo'); });
      nombre.classList.remove('entra'); void nombre.offsetWidth; nombre.classList.add('entra');
      nombre.textContent = r.nombre; bajada.textContent = r.bajada;
      img.classList.add('cambiando');
      setTimeout(() => { img.src = 'img/' + r.foto[0] + '.jpg'; img.onload = () => img.classList.remove('cambiando'); }, 280);
      document.getElementById('vitrina-fila-titulo').textContent = r.nombre;
      document.getElementById('vitrina-link').href = 'destinos.html#' + r.id;
      fila.innerHTML = r.slugs.map(s => porSlug[s] && tarjeta(porSlug[s])).join('');
      fila.scrollLeft = 0;
      [...fila.children].forEach((el, x) => { el.classList.add('entra'); el.style.setProperty('--i', x); });
      prepararFila(fila);
      if (foco) tabs.children[n].focus();
      programar();
    };
    const programar = () => {
      clearTimeout(timer);
      if (quietoV || pausado || !enVista) return;
      const b = tabs.children[actual]; b.classList.remove('corriendo'); void b.offsetWidth; b.classList.add('corriendo');
      timer = setTimeout(() => pintar((actual + 1) % R.length), DUR);
    };
    tabs.style.setProperty('--dur', DUR + 'ms');
    tabs.addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if (b) { pausado = true; pintar(+b.dataset.n); } });
    tabs.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      pausado = true; pintar((actual + (e.key === 'ArrowRight' ? 1 : R.length - 1)) % R.length, true);
    });
    const seccion = tabs.closest('.vitrina');
    seccion.addEventListener('mouseenter', () => { if (!pausado) { clearTimeout(timer); tabs.children[actual].classList.add('en-pausa'); } });
    seccion.addEventListener('mouseleave', () => { tabs.children[actual].classList.remove('en-pausa'); if (!pausado) programar(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { enVista = e.isIntersecting; enVista ? programar() : clearTimeout(timer); }, { threshold: .35 }).observe(seccion);
    pintar(0);
  };

  // ---------- R2 · a dónde vamos ----------
  const adonde = () => {
    const ul = document.getElementById('adonde-lista'); if (!ul) return;
    const L = [
      ['Patagonia', 'parque-patagonia', 'fitz-roy', 'perito-moreno'], ['Salta', 'escapada-a-salta-en-semana-santa', 'salta-quebrada', 'salta-roca'],
      ['Mendoza', 'escapada-a-mendoza', 'mendoza-aconcagua', 'mendoza-bodega'], ['Iguazú', 'escapada-a-iguazu-en-semana-santa', 'iguazu', 'iguazu-selva'],
      ['Bariloche', 'bariloche-en-invierno-tours-y-aventura', 'bariloche-llao-llao', 'bariloche-lagos'], ['Buenos Aires', 'buenos-aires-8-noches-con-visitas-guiadas', 'buenos-aires-caminito', 'buenos-aires-obelisco'],
      ['Plitvice', 'maravillas-de-croacia', 'plitvice', 'split-riva'], ['Dubrovnik', 'capitales-de-los-balcanes-con-dubrovnik-y-zagreb', 'dubrovnik', 'dubrovnik-atardecer'],
      ['Mostar', 'perlas-balcanicas', 'mostar', 'dubrovnik-lovrijenac'], ['Lago Bled', 'lo-mejor-de-croacia-eslovenia-y-bosnia', 'bled', 'plitvice'],
      ['Río de Janeiro', 'rio-de-janeiro-express', 'rio', 'rio-playa'], ['Maceió', 'maceio-pratagy-all-inclusive', 'maceio', ''],
      ['Venecia y Florencia', 'italia-clasica-roma-florencia-y-venecia', 'venecia', 'florencia'], ['París', 'europa-contigo', 'paris', 'lucerna'],
      ['Londres y Cornualles', 'leyendas-del-rey-arturo', 'londres', 'cornualles']
    ].filter(x => porSlug[x[1]]);
    ul.innerHTML = L.map(([n, s, a, b]) => `<li><a href="${urlPaq(s)}" data-a="${a}" data-b="${b}">${esc(n)}<small>${esc(porSlug[s].titulo)} · desde USD ${precioNum(porSlug[s])}</small></a></li>`).join('');
    const sec = ul.closest('.adonde'), fi = sec.querySelector('.adonde__foto--izq'), fd = sec.querySelector('.adonde__foto--der');
    const mostrarFotos = a => {
      const y = a.getBoundingClientRect().top - sec.getBoundingClientRect().top + a.offsetHeight / 2;
      [[fi, a.dataset.a], [fd, a.dataset.b]].forEach(([f, src], k) => {
        if (!src) { f.classList.remove('visible'); return; }
        f.querySelector('img').src = 'img/chicas/' + src + '.jpg';
        f.style.top = (y + (k ? 40 : -60)) + 'px';
        f.classList.add('visible');
      });
    };
    ul.addEventListener('mouseover', e => { const a = e.target.closest('a'); if (a) { ul.classList.add('hay-foco'); mostrarFotos(a); } });
    ul.addEventListener('focusin', e => { const a = e.target.closest('a'); if (a) { ul.classList.add('hay-foco'); mostrarFotos(a); } });
    const ocultar = () => { ul.classList.remove('hay-foco'); fi.classList.remove('visible'); fd.classList.remove('visible'); };
    ul.addEventListener('mouseleave', ocultar); ul.addEventListener('focusout', e => { if (!ul.contains(e.relatedTarget)) ocultar(); });
  };

  // ---------- V2 · el manifiesto se ilumina palabra por palabra al bajar ----------
  const ilumina = () => {
    document.querySelectorAll('[data-ilumina]').forEach(el => {
      const texto = el.textContent;
      el.setAttribute('aria-label', texto);
      el.innerHTML = texto.split(/(\s+)/).map(p => /\s+/.test(p) ? p : `<span class="palabra" aria-hidden="true">${esc(p)}</span>`).join('');
      const ps = [...el.querySelectorAll('.palabra')];
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { ps.forEach(p => p.classList.add('encendida')); return; }
      const actualizar = () => {
        const r = el.getBoundingClientRect(), vh = innerHeight;
        const avance = Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .5)));
        const n = Math.round(avance * ps.length);
        ps.forEach((p, x) => p.classList.toggle('encendida', x < n));
      };
      addEventListener('scroll', () => requestAnimationFrame(actualizar), { passive: true }); actualizar();
    });
  };

  // ---------- páginas ----------
  const inits = {
    inicio() {
      // categorías de la portada: cada una cambia la foto de fondo y la fila de tarjetas
      const cats = [
        { id: 'promos', nombre: 'Promos', foto: K.promos.foto, titulo: K.promos.titulo, bajada: K.promos.bajada, nota: K.promos.nota,
          slugs: K.promos.items.map(x => x.slug), link: 'destinos.html#promos' },
        ...K.regiones.map(r => ({ id: r.id, nombre: r.nombre, foto: r.foto, titulo: r.nombre, bajada: r.bajada, nota: r.nota, slugs: r.slugs, link: 'destinos.html#' + r.id }))
      ];
      const cont = document.getElementById('categorias') || document.createElement('div');   // sin categorías: la portada muestra solo las promos
      cont.innerHTML = cats.map((c, n) => `<button class="categoria" type="button" role="tab" id="cat-${c.id}" aria-controls="panel-categoria" aria-selected="${n === 0}" tabindex="${n === 0 ? 0 : -1}" data-id="${c.id}">
          <img src="img/chicas/${c.foto[0]}.jpg" alt="" loading="lazy">${esc(c.nombre)}</button>`).join('') +
        `<a class="categoria" href="presupuesto.html"><span class="categoria__mas" aria-hidden="true">${I.mas}</span>A medida</a>`;
      // video de fondo: con «reducir movimiento» queda quieto en el primer cuadro
      const video = document.getElementById('portada-video');
      // 1080p en pantallas grandes, 720p en celular (pesa la cuarta parte)
      if (video) { video.src = 'img/' + (matchMedia('(min-width: 900px)').matches ? 'portada.mp4' : 'portada-movil.mp4'); }
      if (video && matchMedia('(prefers-reduced-motion: reduce)').matches) { video.removeAttribute('autoplay'); video.pause(); }
      const notaHTML = c => c.nota ? `<aside class="tarjeta-nota"><img src="img/chicas/${c.foto[0]}.jpg" alt="" loading="lazy">
          <h3>${esc(c.nota.titulo)}</h3><ul>${c.nota.lineas.map(l => `<li>${I.check}<span>${esc(l)}</span></li>`).join('')}</ul>
          <a class="btn btn--claro" href="presupuesto.html">Pedí tu total</a></aside>` : '';
      const mostrar = id => {
        const c = cats.find(x => x.id === id);
        cont.querySelectorAll('[role=tab]').forEach(b => { const on = b.dataset.id === id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
        document.getElementById('fila-titulo').textContent = c.titulo;
        document.getElementById('fila-bajada').textContent = c.bajada;
        document.getElementById('fila-link').href = c.link;
        const filaCat = document.getElementById('fila-categoria');
        filaCat.innerHTML = c.slugs.map(s => porSlug[s] && tarjeta(porSlug[s])).join('') + notaHTML(c);
        filaCat.scrollLeft = 0;
        [...filaCat.children].forEach((el, n) => { el.classList.add('entra'); el.style.setProperty('--i', n); });
        prepararFila(filaCat);
        observar();
      };
      cont.addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if (b) mostrar(b.dataset.id); });
      cont.addEventListener('keydown', e => {
        const tabs = [...cont.querySelectorAll('[role=tab]')]; const n = tabs.indexOf(document.activeElement);
        if (n < 0 || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        const sig = tabs[(n + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; sig.focus(); mostrar(sig.dataset.id);
      });
      mostrar('promos');
      // la foto termina a la altura de las tarjetas, como en la referencia
      const fondo = document.querySelector('.portada__fondo'), fila = document.getElementById('fila-categoria');
      const medir = () => { fondo.style.height = (fila.getBoundingClientRect().top - document.querySelector('.portada').getBoundingClientRect().top + 150) + 'px'; };
      medir(); addEventListener('resize', medir); document.fonts && document.fonts.ready.then(medir);
      vitrina(); adonde(); ilumina();
      armarForm(document.getElementById('buscador'), 'rapido');
      armarForm(document.getElementById('form-presupuesto'), 'presupuesto');
    },

    destinos() {
      const cont = document.getElementById('listado');
      const chips = document.getElementById('filtro-regiones');
      let orden = '';
      selector(document.getElementById('orden'), { name: 'orden', etiqueta: 'Ordenar', vacio: 'Como en la web', valor: '',
        opciones: [{ grupo: '', items: [{ valor: '', texto: 'Como en la web' }, { valor: 'menor', texto: 'Precio, de menor a mayor' }, { valor: 'mayor', texto: 'Precio, de mayor a menor' }] }],
        alCambiar: v => { orden = v; pintar(); } });
      chips.innerHTML = '<button class="chip" type="button" data-r="todos" aria-pressed="true">Todos <small>' + PAQ.length + '</small></button>' +
        `<button class="chip" type="button" data-r="promos" aria-pressed="false">Promos <small>${K.promos.items.length}</small></button>` +
        K.regiones.map(r => `<button class="chip" type="button" data-r="${r.id}" aria-pressed="false">${r.nombre} <small>${r.slugs.length}</small></button>`).join('');
      let actual = (location.hash || '#todos').slice(1);
      const pintar = () => {
        chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.r === actual)));
        const act = chips.querySelector('[aria-pressed="true"]'); if (act) chips.scrollLeft = Math.max(0, act.offsetLeft - chips.offsetLeft - 16);
        const ordenar = arr => orden === 'menor' ? [...arr].sort((a, b) => parseFloat(precioNum(a).replace('.', '')) - parseFloat(precioNum(b).replace('.', '')))
          : orden === 'mayor' ? [...arr].sort((a, b) => parseFloat(precioNum(b).replace('.', '')) - parseFloat(precioNum(a).replace('.', ''))) : arr;
        let bloques;
        if (actual === 'promos') bloques = [{ nombre: K.promos.titulo, bajada: K.promos.bajada, slugs: K.promos.items.map(x => x.slug) }];
        else bloques = K.regiones.filter(r => actual === 'todos' || r.id === actual);
        cont.innerHTML = bloques.map(r => `<section class="region-bloque" aria-labelledby="t-${r.id || 'promos'}">
            <h2 id="t-${r.id || 'promos'}">${esc(r.nombre)}</h2><p class="bajada">${esc(r.bajada)}</p>
            <div class="grilla">${ordenar(r.slugs.map(s => porSlug[s]).filter(Boolean)).map(p => tarjeta(p)).join('')}</div></section>`).join('') || '<p class="vacio">No hay viajes con ese filtro.</p>';
        observar();
      };
      chips.addEventListener('click', e => {
        const b = e.target.closest('.chip'); if (!b) return;
        actual = b.dataset.r; history.replaceState(null, '', '#' + actual); pintar();
      });
      // los enlaces del menú («Promos», regiones del pie) cambian solo el # estando ya en Destinos
      addEventListener('hashchange', () => {
        const r = (location.hash || '#todos').slice(1);
        if (!chips.querySelector(`[data-r="${CSS.escape(r)}"]`)) return;
        actual = r; pintar();
        chips.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      if (!chips.querySelector(`[data-r="${CSS.escape(actual)}"]`)) actual = 'todos';
      pintar();
    },

    paquete() {
      const slug = window.KRAVATA_SLUG || new URLSearchParams(location.search).get('p') || 'rio-de-janeiro-express';
      const p = porSlugTodos[slug];
      if (!p) { document.getElementById('ficha').innerHTML = '<p class="vacio">No encontramos ese viaje. <a class="link" href="destinos.html">Ver todos los destinos</a></p>'; return; }
      document.title = `${p.titulo} · Kravata Travel`;
      const r = region(slug);
      const fotos = K.fotos[slug] || [];
      const promo = esPromo(slug);
      const salida = (p.datos.find(d => /salida/i.test(d.k)) || {}).v || '';
      const waTexto = p.wa ? decodeURIComponent((p.wa.split('text=')[1] || '').replace(/\+/g, ' ')) : `Hola, quiero consultar por el paquete ${p.titulo}.`;
      document.getElementById('migas').innerHTML = `<a href="index.html">Inicio</a> / <a href="destinos.html">Destinos</a> / ${r ? `<a href="destinos.html#${r.id}">${r.nombre}</a> / ` : ''}<span aria-current="page">${esc(p.titulo)}</span>`;
      document.getElementById('galeria').className = 'galeria galeria--' + Math.min(fotos.length, 3);
      document.getElementById('galeria').innerHTML = fotos.slice(0, 3).map((f, i) =>
        `<figure><img src="img/${f[0]}.jpg" alt="${esc(f[1])}" ${i ? 'loading="lazy"' : ''}></figure>`).join('');
      const sec = (t, html) => html ? `<section><h2>${t}</h2>${html}</section>` : '';
      const lista = (arr, no) => arr.length ? `<ul class="lista-check${no ? ' lista-check--no' : ''}">${arr.map(x => `<li>${no ? I.cruz : I.check}<span>${esc(x)}</span></li>`).join('')}</ul>` : '';
      const itin = p.itinerario.length
        ? `<ol class="dias${p.itinerario.length > 4 ? ' dias--cerradas' : ''}" id="dias">${p.itinerario.map(d => `<li><b>${esc(d.d)}</b><span>${esc(d.t)}</span></li>`).join('')}</ol>` +
          (p.itinerario.length > 4 ? `<button class="mas" type="button" id="ver-dias" aria-controls="dias" aria-expanded="false"><span>Ver los ${p.itinerario.length} días</span>${I.chevron}</button>` : '')
        : `<p>${esc(p.itinerarioNota)}</p>`;
      document.getElementById('ficha').innerHTML = `
        <div class="ficha__principal">
          <div class="ficha__titulo">
            ${promo ? `<span class="etiqueta etiqueta--promo etiqueta--suelta">${svgRombo}${esc(promo.etiqueta)}</span>` : ''}
            <h1>${esc(p.titulo)}</h1>
            <div class="ficha__meta">
              <span class="pastilla">${esc(diasCorto(p))}</span>
              ${p.badges.map(b => `<span class="pastilla${b.si ? '' : ' pastilla--no'}">${b.si ? I.check : I.menos}${esc(b.t)}</span>`).join('')}
            </div>
          </div>
          <section><p class="ficha__intro">${esc(p.descripcion)}</p></section>
          ${sec('Duración y características', `<dl class="datos">${p.datos.map(d => `<div><dt>${esc(d.k)}</dt><dd>${esc(d.v)}</dd></div>`).join('')}</dl>`)}
          ${sec(p.itinerario.length ? 'Itinerario día por día' : 'Itinerario', itin)}
          <section><div class="dos-col"><div><h2>Qué incluye</h2>${lista(p.incluye)}</div><div><h2>Qué no incluye</h2>${lista(p.noIncluye, true)}</div></div></section>
          ${p.actividades.length ? sec('Actividades sugeridas', lista(p.actividades) + '<p class="nota">Son sugerencias: no están incluidas en el precio.</p>') : ''}
          ${p.notas.length ? sec('Notas del viaje', lista(p.notas)) : ''}
          ${sec('Condiciones', `<p>${esc(p.condiciones).replace('términos y condiciones', `<a class="link" href="${C.terminos}">términos y condiciones</a>`)}</p>`)}
        </div>
        <aside class="caja-precio" aria-label="Precio">
          <p class="caja-precio__desde">Desde</p>
          <p class="caja-precio__monto">USD ${precioNum(p)}</p>
          <p class="caja-precio__modo">Por persona, en base doble. Salida cotizada: ${esc(salida)}.</p>
          <div class="aviso">${I.info}<span>${esc(p.precioAviso || 'No es un total final: consultanos el valor con impuestos antes de reservar.')}</span></div>
          <a class="btn btn--ancho" href="${wa(waTexto)}" target="_blank" rel="noopener">${I.wa}Consultar por WhatsApp</a>
          <a class="link caja-precio__otro" href="presupuesto.html?destino=${encodeURIComponent(p.titulo)}#form-presupuesto">Elegir salida y personas</a>
          <div class="caja-precio__firma"><span class="sello-chico">${svgRombo}</span><span><b>Te respondo yo.</b> Antes de pagar te mando el detalle completo: qué incluye, qué no y cuánto sale de verdad.</span></div>
          <div class="caja-precio__letra">${p.precioModo.slice(1).map(t => `<p>${esc(t)}</p>`).join('')}${p.precioImpuestos.map(t => `<p>${esc(t)}</p>`).join('')}</div>
        </aside>`;
      const btn = document.getElementById('ver-dias');
      if (btn) btn.addEventListener('click', () => {
        const ol = document.getElementById('dias'); const cerr = ol.classList.toggle('dias--cerradas');
        if (!cerr) [...ol.children].slice(3).forEach((li, n) => { li.classList.remove('entra'); void li.offsetWidth; li.classList.add('entra'); li.style.setProperty('--i', n); });
        btn.setAttribute('aria-expanded', String(!cerr)); btn.querySelector('span').textContent = cerr ? `Ver los ${p.itinerario.length} días` : 'Ver menos';
      });
      const barra = document.getElementById('barra-precio');
      barra.innerHTML = `<div><small>Desde, por persona</small><b>USD ${precioNum(p)}</b></div><a class="btn" href="${wa(waTexto)}" target="_blank" rel="noopener">${I.wa}Consultar</a>`;
      document.body.classList.add('con-barra');
      const otros = (r ? r.slugs : []).filter(s => s !== slug).map(s => porSlug[s]).filter(Boolean);
      const mas = otros.length < 3 ? K.promos.items.map(x => porSlug[x.slug]).filter(x => x && x.slug !== slug && !otros.includes(x)) : [];
      document.getElementById('otros').innerHTML = [...otros, ...mas].slice(0, 8).map(x => tarjeta(x)).join('');
    },

    arrepentimiento() {
      const form = document.getElementById('form-arrepentimiento');
      const paquetes = [...TODOS.map(p => p.titulo), 'Otro (lo detallo abajo)'];
      selector(form.querySelector('[data-campo=paquete]'), { name: 'paquete', etiqueta: 'Paquete contratado *', vacio: 'Elegí un paquete', opciones: [{ grupo: '', items: paquetes.map(t => ({ valor: t, texto: t })) }] });
      const err = document.getElementById('a-err'), ok = document.getElementById('a-ok');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form)); const v = k => (d[k] || '').trim();
        form.querySelectorAll('.fld').forEach(f => f.classList.remove('fld--error'));
        const faltan = ['nombre', 'dni', 'email', 'paquete', 'fecha'].filter(k => !v(k) || (k === 'email' && v(k).indexOf('@') < 1));
        if (faltan.length) {
          faltan.forEach(k => { const el = form.querySelector(`[name=${k}]`); (el.closest('.fld')).classList.add('fld--error'); });
          err.className = 'form-estado es-error'; err.textContent = 'Completá los campos obligatorios (*) con un email válido.';
          const primero = form.querySelector(`[name=${faltan[0]}]`); (primero.type === 'hidden' ? primero.closest('.fld').querySelector('button') : primero).focus();
          return;
        }
        err.className = 'form-estado'; err.textContent = '';
        const f = new Date(), p2 = n => (n < 10 ? '0' : '') + n, r = Math.floor(Math.random() * 9000 + 1000);
        const code = 'KRV-' + f.getFullYear() + p2(f.getMonth() + 1) + p2(f.getDate()) + '-' + r;
        const body = 'SOLICITUD DE REVOCACIÓN (BOTÓN DE ARREPENTIMIENTO)\nCódigo: ' + code + '\nFecha de la solicitud: ' + p2(f.getDate()) + '/' + p2(f.getMonth() + 1) + '/' + f.getFullYear() +
          '\n\nNombre y apellido: ' + v('nombre') + '\nDNI: ' + v('dni') + '\nEmail: ' + v('email') + '\nTeléfono: ' + (v('tel') || '-') +
          '\nPaquete contratado: ' + v('paquete') + '\nFecha de contratación o de pago: ' + v('fecha') + '\nComentarios: ' + (v('mas') || '-');
        document.getElementById('a-c').textContent = code;
        document.getElementById('a-pre').textContent = body;
        document.getElementById('a-mail').href = 'mailto:' + C.mail + '?subject=' + encodeURIComponent('Revocación ' + code) + '&body=' + encodeURIComponent(body);
        const cp = document.getElementById('a-cp');
        cp.onclick = () => { try { navigator.clipboard.writeText(body).then(() => { cp.textContent = 'Copiado'; }); } catch (x) {} };
        ok.hidden = false; ok.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },

    guia() {
      const r = K.regiones.find(x => x.id === 'croacia');
      document.getElementById('guia-paquetes').innerHTML = (r ? r.slugs : []).map(s => porSlug[s] && tarjeta(porSlug[s])).join('');
      document.getElementById('guia-wa').href = wa('Hola, quiero armar un viaje a Croacia.');
      document.getElementById('guia-wa').insertAdjacentHTML('afterbegin', I.wa);
    },

    presupuesto() {
      armarForm(document.getElementById('form-presupuesto'), 'presupuesto');
      const d = document.getElementById('datos-contacto');
      if (d) d.innerHTML = `
        <li>${I.wa}<span><a href="${wa('Hola, quiero consultar por un viaje.')}" target="_blank" rel="noopener">WhatsApp ${C.whatsappVisible}</a></span></li>
        <li>${I.mail}<span><a href="mailto:${C.mail}">${C.mail}</a></span></li>
        <li>${I.reloj}<span>${C.horario}</span></li>
        <li>${I.casa}<span>Agencia 100 % online, sin atención presencial. Domicilio legal: ${C.domicilio}</span></li>
        <li>${I.ig}<span><a href="${C.instagram}" target="_blank" rel="noopener">@kravata.travel</a> en Instagram y TikTok</span></li>`;
    }
  };

  document.querySelectorAll('[data-icono]').forEach(el => el.insertAdjacentHTML('afterbegin', I[el.dataset.icono] || ''));
  document.querySelectorAll('[data-svg]').forEach(el => el.innerHTML = SVG[el.dataset.svg] || '');
  if (inits[pagina]) inits[pagina]();
  prepararFilas();
  observar();
})();
