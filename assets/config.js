// Lo que se edita a mano: promociones, regiones, fotos y datos de contacto.
// Los paquetes (precios, itinerarios, servicios) vienen de data.js, relevado de kravatatravel.com.

window.KRAVATA = {
  // preview: muestra el aviso de fotos provisorias. rutasFijas: cada paquete en paquetes/<slug>.html (la web real).
  sitio: { preview: false, rutasFijas: true },

  contacto: {
    whatsapp: '5492214406602',
    whatsappVisible: '221 440 6602',
    mail: 'kravatatravel@gmail.com',
    horario: 'Lunes a viernes, de 9 a 18 h',
    titular: 'Fabrizio Agustín Vallejo Miera',
    cuit: '20-43686014-6',
    domicilio: 'Calle 45 N.º 1021, La Plata, Buenos Aires',
    instagram: 'https://www.instagram.com/kravata.travel',
    tiktok: 'https://www.tiktok.com/@kravata.travel',
    facebook: 'https://www.facebook.com/profile.php?id=61596314343505',
    defensaConsumidor: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario',
    terminos: 'terminos.html',
    arrepentimiento: 'arrepentimiento.html'
  },

  // Promociones: se suman o se sacan acá, sin tocar el diseño.
  // «slug» es el paquete; «titulo» y «bajada» son el texto de la promo.
  promos: {
    titulo: 'Brasil, este verano',
    foto: ['rio', 'Bahía de Botafogo y el Pan de Azúcar, Río de Janeiro'],
    nota: { titulo: 'Promo Brasil', lineas: ['Vuelo desde Buenos Aires incluido en los dos.', 'Precio por persona, en base doble, con la letra chica a la vista.', 'Antes de pagar te mando el total con impuestos.'] },
    bajada: 'La gente ya está armando enero y febrero. Dos opciones con vuelo desde Buenos Aires, con el precio dicho de verdad.',
    items: [
      { slug: 'rio-de-janeiro-express', etiqueta: 'Promo Brasil', gancho: 'La escapada más corta y la más barata de la web.' },
      { slug: 'maceio-pratagy-all-inclusive', etiqueta: 'Promo Brasil', gancho: 'Una semana en un resort todo incluido.' }
    ]
  },

  regiones: [
    { id: 'argentina', nombre: 'Argentina', bajada: 'Semana Santa con vuelo, la Patagonia en verano y Bariloche en invierno.', foto: ['fitz-roy', 'Cerro Fitz Roy, Patagonia'],
      slugs: ['parque-patagonia', 'escapada-a-salta-en-semana-santa', 'escapada-a-mendoza', 'escapada-a-iguazu-en-semana-santa', 'buenos-aires-8-noches-con-visitas-guiadas', 'bariloche-en-invierno-tours-y-aventura'] },
    { id: 'croacia', nombre: 'Croacia y Balcanes', bajada: 'Circuitos terrestres, sin vuelo: el aéreo lo cotizamos aparte, a tu medida.', foto: ['dubrovnik-atardecer', 'Dubrovnik al anochecer'],
      nota: { titulo: 'Croacia es terrestre', lineas: ['Los circuitos no incluyen el vuelo.', 'El aéreo lo cotizamos aparte, según tu fecha y desde dónde salís.', 'Con guía de habla hispana: el detalle de cada uno está en su ficha.'] },
      slugs: ['maravillas-de-croacia', 'descubra-croacia', 'capitales-de-los-balcanes-con-dubrovnik-y-zagreb', 'lo-mejor-de-croacia-eslovenia-y-bosnia', 'perlas-balcanicas', 'conozca-italia-y-croacia'] },
    { id: 'brasil', nombre: 'Brasil', bajada: 'Con vuelo desde Buenos Aires.', foto: ['rio-playa', 'Playa de Ipanema, Río de Janeiro'],
      slugs: ['rio-de-janeiro-express', 'maceio-pratagy-all-inclusive'] },
    { id: 'europa', nombre: 'Europa', bajada: 'Circuitos sin vuelo internacional.', foto: ['venecia', 'Gran Canal, Venecia'],
      slugs: ['europa-contigo', 'italia-clasica-roma-florencia-y-venecia', 'leyendas-del-rey-arturo', 'barcelona-costa-azul-y-roma', 'madrid-lourdes-y-paris', 'madrid-y-londres'] }
  ],

  // Fotos provisorias de Unsplash (ver img/FUENTES.md). La primera es la de la tarjeta.
  fotos: {
    'parque-patagonia': [['fitz-roy', 'Cerro Fitz Roy, Patagonia'], ['perito-moreno', 'Glaciar Perito Moreno'], ['fitz-roy-atardecer', 'Fitz Roy al atardecer']],
    'escapada-a-salta-en-semana-santa': [['salta-quebrada', 'Quebrada de las Conchas, Salta'], ['salta-roca', 'Formaciones rojizas camino a Cafayate']],
    'escapada-a-mendoza': [['mendoza-aconcagua', 'Cerro Aconcagua, Mendoza'], ['mendoza-bodega', 'Barricas en una bodega']],
    'escapada-a-iguazu-en-semana-santa': [['iguazu', 'Cataratas del Iguazú'], ['iguazu-selva', 'Saltos entre la selva misionera']],
    'buenos-aires-8-noches-con-visitas-guiadas': [['buenos-aires-caminito', 'Caminito, La Boca, Buenos Aires'], ['buenos-aires-obelisco', 'El Obelisco y la avenida 9 de Julio']],
    'bariloche-en-invierno-tours-y-aventura': [['bariloche-llao-llao', 'Hotel Llao Llao y el cerro López nevado, Bariloche'], ['bariloche-lagos', 'Lagos del Circuito Chico, Bariloche']],
    'maravillas-de-croacia': [['plitvice', 'Lagos de Plitvice'], ['split-riva', 'La Riva de Split'], ['dubrovnik-lovrijenac', 'Fuerte Lovrijenac, Dubrovnik']],
    'descubra-croacia': [['split', 'Puerto de Split'], ['dubrovnik', 'Dubrovnik desde el aire'], ['plitvice', 'Lagos de Plitvice']],
    'capitales-de-los-balcanes-con-dubrovnik-y-zagreb': [['dubrovnik-atardecer', 'Dubrovnik al anochecer'], ['mostar', 'Puente Viejo de Mostar'], ['dubrovnik', 'Dubrovnik desde el aire']],
    'lo-mejor-de-croacia-eslovenia-y-bosnia': [['bled', 'Lago Bled, Eslovenia'], ['mostar', 'Puente Viejo de Mostar'], ['plitvice', 'Lagos de Plitvice']],
    'perlas-balcanicas': [['mostar', 'Puente Viejo de Mostar'], ['dubrovnik-lovrijenac', 'Fuerte Lovrijenac, Dubrovnik'], ['split', 'Puerto de Split']],
    'conozca-italia-y-croacia': [['venecia', 'Gran Canal, Venecia'], ['florencia', 'Florencia y el Duomo'], ['dubrovnik', 'Dubrovnik desde el aire']],
    'maceio-pratagy-all-inclusive': [['maceio', 'Jangadas en el mar de Maceió']],
    'europa-contigo': [['paris', 'Torre Eiffel y el Sena, París'], ['lucerna', 'Puente de la Capilla, Lucerna'], ['venecia', 'Gran Canal, Venecia']],
    'italia-clasica-roma-florencia-y-venecia': [['florencia', 'Florencia y el Duomo'], ['venecia', 'Gran Canal, Venecia']],
    'leyendas-del-rey-arturo': [['cornualles', "St Michael's Mount, Cornualles"], ['londres', 'Parlamento y Big Ben, Londres']],
    'rio-de-janeiro-express': [['rio', 'Bahía de Botafogo y el Pan de Azúcar'], ['rio-pan-de-azucar', 'Pan de Azúcar desde el Corcovado'], ['rio-playa', 'Playa de Ipanema']],
    'barcelona-costa-azul-y-roma': [['barcelona', 'El Eixample y la Sagrada Familia, Barcelona']],
    'madrid-lourdes-y-paris': [['madrid', 'Plaza Mayor, Madrid'], ['paris', 'Torre Eiffel y el Sena, París']],
    'madrid-y-londres': [['madrid', 'Plaza Mayor, Madrid'], ['londres', 'Parlamento y Big Ben, Londres']]
  }
};
