# SoundLab - Beats & Estudio de Producción

## 📁 Estructura del Proyecto

```
github/
│
├── 📄 index.html           # Archivo principal HTML
├── 📁 css/
│   └── styles.css          # Estilos globales y responsive
├── 📁 js/
│   └── script.js           # Lógica JavaScript
└── 📄 README.md            # Este archivo
```

## 📋 Descripción de Archivos

### **index.html**
Archivo HTML principal que contiene la estructura de la página y referencias a los archivos CSS y JS externos.

**Secciones:**
- Navbar con menú responsivo
- Hero Section con efectos glow
- Beats Store con reproductor de waveform
- Servicios profesionales
- Tabla de precios/licencias
- Testimonios
- FAQ tipo acordeón
- Footer

### **css/styles.css**
Archivo CSS modular que contiene todos los estilos de la página.

**Incluye:**
- Estilos base y reset
- Componentes (navbar, botones, cards)
- Layout (grid, flexbox)
- Animaciones y transiciones
- Media queries responsivas (768px y 480px)
- Efectos visuales (gradientes, glows, fondos)

### **js/script.js**
Archivo JavaScript que maneja toda la interactividad.

**Funcionalidades:**
- Renderizado dinámico de beats
- Sistema de filtros por género
- Búsqueda en tiempo real
- Controles del reproductor
- Menú móvil
- Event listeners

## 🎨 Características Principales

✅ **Diseño Responsivo** - Optimizado para desktop, tablet y móvil  
✅ **Efectos Visuales Premium** - Gradientes, glows, animaciones fluidas  
✅ **Interactividad Completa** - Filtros, búsqueda, player de beats  
✅ **Código Modular** - Separación clara HTML/CSS/JS  
✅ **Código Limpio** - Bien organizado y documentado  

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. La página cargará automáticamente con todos los estilos y funcionalidades
3. Interactúa con los filtros, búsqueda y controles

## 📱 Breakpoints Responsivos

- **Escritorio:** 1200px+
- **Tablet:** 768px - 1199px
- **Móvil:** Menos de 768px
- **Móvil Pequeño:** Menos de 480px

## 🎵 Datos de Beats

Los beats están almacenados en el array `beatsData` en `js/script.js`:
- ID
- Título
- Artista
- Género (trap, reggaeton, hip-hop, r-b)
- Precio
- Icono

Puedes agregar más beats fácilmente editando este array.

## 🔧 Personalizaciones

### Cambiar Colores
Los colores principales están en `css/styles.css`:
- Cian: `#00d4ff`
- Púrpura: `#7c3aed`
- Azul oscuro: `#1a1a2e`

### Agregar Beats
En `js/script.js`, agrega nuevos objetos al array `beatsData`:

```javascript
{ 
  id: 9, 
  title: 'New Beat', 
  artist: 'Artist Name', 
  genre: 'genre', 
  price: 29, 
  icon: '🎵' 
}
```

### Modificar Contenido
Edita el HTML en `index.html` directamente. Los estilos se actualizarán automáticamente.

## 📄 Licencia

Proyecto de demostración | Uso libre para fines educativos

---

**Última actualización:** 31 de Marzo, 2026
