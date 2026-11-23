# Kravata Travel · web nueva

Esta es la versión nueva de **kravatatravel.com**, con la marca nueva: el símbolo D3 y el logotipo T6. Reemplaza a la web actual.

Tiene todo lo que hoy ofrece la web:

- **Los 20 paquetes**, con sus precios, salidas, itinerarios, servicios y notas. Los datos se copiaron de la web actual el 23 de noviembre de 2026.
- **Los datos de contacto y los legales:** el WhatsApp, el mail, el titular, el CUIT y el domicilio.
- **Las páginas:** Términos y condiciones (el mismo texto), Botón de arrepentimiento (con la misma lógica), Sobre nosotros (el mismo texto) y Guía de Croacia.

## Qué cambia y qué se mantiene

- **Las direcciones se mantienen.** Cada paquete sigue en `paquetes/<nombre>.html`, igual que hoy, y también siguen `nosotros.html`, `guia-croacia.html`, `terminos.html` y `arrepentimiento.html`. Así no se pierde nada de lo que Google ya tiene guardado ni se rompen los links compartidos.
- **Hay dos páginas nuevas:** `destinos.html`, con todos los viajes y filtros por región, y `presupuesto.html`, con el formulario de consulta.
- **Las consultas siguen yendo a WhatsApp,** al 221 440 6602, con el paquete, la fecha y la cantidad de personas ya escritos en el mensaje.
- **Los paquetes vencidos se ocultan solos** de los listados, igual que hoy.

## Cómo subirla (Vercel)

La web actual ya está en Vercel y también es un sitio estático, así que el reemplazo es directo. No hay que instalar nada ni compilar.

**Si la web está conectada a un repositorio de GitHub** (es lo más común):

1. En este repositorio, tocá **Code → Download ZIP** y descomprimilo.
2. En el repositorio de tu web, borrá los archivos actuales y poné en su lugar todo el contenido del ZIP.
3. Hacé commit y push. Vercel la publica sola en uno o dos minutos.

**Si la subís con la herramienta de Vercel en la terminal:** dentro de la carpeta descomprimida, corré `vercel --prod` y elegí el proyecto de kravatatravel.com.

**En la configuración del proyecto de Vercel:** Framework Preset en «Other», sin Build Command y con la carpeta raíz como Output Directory.

Antes de reemplazar, conviene hacer una copia de la web actual (un ZIP del repositorio o una rama aparte), por si hay que volver atrás.

## Después de subirla

- Revisá un par de paquetes y el botón de WhatsApp.
- En Google Search Console, volvé a enviar `sitemap.xml`.

## Para tener en cuenta

- **Las fotos son provisorias.** Salen de Unsplash, con licencia libre para uso comercial, y el video de portada es de Mixkit. Las fuentes de cada una están en `img/FUENTES.md`. Cuando haya fotos propias, se cambian por otras con el mismo nombre en `img/` (1800 × 1350 px) y en `img/chicas/` (800 × 600 px).
- **Para cambiar las promos, las regiones, las fotos de cada paquete o los datos de contacto,** se edita `assets/config.js`.
- **Para sumar o editar paquetes,** se edita `assets/data.js` (hay uno por cada viaje). Después hay que crear su página en `paquetes/` y sumarla a `sitemap.xml`. Si preferís, de eso se encargan Joaco y David.

## Contenido

| Qué | Dónde |
|---|---|
| Páginas | `index.html`, `destinos.html`, `presupuesto.html`, `nosotros.html`, `guia-croacia.html`, `terminos.html`, `arrepentimiento.html`, `404.html` |
| Una página por paquete | `paquetes/` |
| Paquetes (precios, itinerarios) | `assets/data.js` |
| Promos, regiones, fotos y contacto | `assets/config.js` |
| Diseño y funcionamiento | `assets/style.css`, `assets/site.js`, `assets/marca.js` |
| Logo y símbolo | `marca/` |
| Fotos y video | `img/` |
| Para Google | `sitemap.xml`, `robots.txt` |
