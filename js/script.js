/**
 * SoundLab JavaScript
 * - Mantener los datos de beats separados de la lógica de interfaz.
 * - Usar funciones limpias para renderizar componentes y manejar eventos.
 * - Minimizar el acceso directo al DOM y reusar selectores cuando sea posible.
 */

// ===== BEATS DATA =====
const beatsData = [
    { id: 1, title: 'Midnight Vibes', artist: 'SoundLab Studios', genre: 'trap', price: 29, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=250&h=150&fit=crop' },
    { id: 2, title: 'Reggaeton Flow', artist: 'Latino Beats', genre: 'reggaeton', price: 29, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=150&fit=crop' },
    { id: 3, title: 'Hip-Hop Thunder', artist: 'Street Beats', genre: 'hip-hop', price: 39, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=250&h=150&fit=crop' },
    { id: 4, title: 'R&B Smooth', artist: 'Urban Sounds', genre: 'r-b', price: 49, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=250&h=150&fit=crop' },
    { id: 5, title: 'Trap Energy', artist: 'SoundLab Studios', genre: 'trap', price: 29, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=250&h=150&fit=crop' },
    { id: 6, title: 'Reggaeton Heat', artist: 'Latino Beats', genre: 'reggaeton', price: 29, image: 'https://images.unsplash.com/photo-1534439307853-a81b042d2d17?w=250&h=150&fit=crop' },
    { id: 7, title: 'Hip-Hop Classic', artist: 'Street Beats', genre: 'hip-hop', price: 39, image: 'https://images.unsplash.com/photo-1516636672472-f552e278e585?w=250&h=150&fit=crop' },
    { id: 8, title: 'R&B Passion', artist: 'Urban Sounds', genre: 'r-b', price: 49, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=250&h=150&fit=crop' },
];

// ===== RENDER BEATS =====
// Esta función renderiza la lista de beats según el filtro y el texto de búsqueda.
// Se reconstruye el listado completo en cada cambio para mantener el DOM sincronizado.
function renderBeats(filter = 'todos', search = '') {
    const beatsList = document.getElementById('beatsList');
    beatsList.innerHTML = '';

    beatsData
        .filter(beat => {
            const matchGenre = filter === 'todos' || beat.genre === filter;
            const matchSearch = beat.title.toLowerCase().includes(search.toLowerCase());
            return matchGenre && matchSearch;
        })
        .forEach(beat => {
            const beatCard = document.createElement('div');
            beatCard.className = 'beat-card';
            beatCard.innerHTML = `
                <div class="beat-card-image" style="background-image: url('${beat.image}'); background-size: cover; background-position: center;"></div>
                <div class="beat-card-content">
                    <div class="beat-card-title">${beat.title}</div>
                    <div class="beat-card-artist">${beat.artist}</div>
                    <div class="beat-card-price">$${beat.price}</div>
                    <div class="beat-card-footer">
                        <button class="beat-play-btn" onclick="playBeat(${beat.id}, '${beat.title}')">▶ Escuchar</button>
                        <button class="beat-buy-btn" onclick="buyBeat(${beat.id}, '${beat.title}')">🛒 Comprar</button>
                    </div>
                </div>
            `;
            beatsList.appendChild(beatCard);
        });
}

// ===== PLAY BEAT =====
function playBeat(id, title) {
    document.getElementById('currentBeatTitle').textContent = title;
    const playBtn = document.getElementById('playBtn');
    playBtn.textContent = '⏸';
    playBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
}

// ===== BUY BEAT =====
function buyBeat(id, title) {
    alert(`¡Gracias por tu interés en "${title}"! Sistema de compra integrado próximamente.`);
}

// ===== SELECT LICENSE =====
function selectLicense(type, price) {
    alert(`Licencia ${type.toUpperCase()} seleccionada - $${price}. Redirigiendo a checkout...`);
}

// ===== FILTROS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderBeats(this.dataset.genre, document.getElementById('searchInput').value);
    });
});

// ===== BUSQUEDA =====
document.getElementById('searchInput').addEventListener('input', function() {
    const activeGenre = document.querySelector('.filter-btn.active').dataset.genre;
    renderBeats(activeGenre, this.value);
});

// ===== PLAY BUTTON =====
document.getElementById('playBtn').addEventListener('click', function() {
    if (this.textContent === '▶') {
        this.textContent = '⏸';
        this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    } else {
        this.textContent = '▶';
        this.style.background = 'linear-gradient(135deg, #00d4ff, #7c3aed)';
    }
});

// ===== MENU MOBILE =====
document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// ===== RENDER INICIAL =====
renderBeats();

// ===== CARRUSEL LÓGICA =====
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function mostrarImagen(n) {
    if (slides.length === 0) return;
    
    // Ocultar todas
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Limites
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    // Mostrar actual
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function cambiarImagen(direccion) {
    mostrarImagen(slideIndex += direccion);
}

function currentSlide(n) {
    mostrarImagen(slideIndex = n);
}

// Listeners Carrusel
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if(prevBtn) prevBtn.addEventListener('click', () => cambiarImagen(-1));
if(nextBtn) nextBtn.addEventListener('click', () => cambiarImagen(1));

// ===== FORMULARIOS Y VALIDACIONES =====
// Estructura de Datos
let usuariosRegistrados = [];

// Expresión regular para email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función Modular para Validar y Mostrar Errores (actualizarDOM)
function actualizarDOM(elementId, message, isError) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? '#ff4757' : '#2ed573';
}

function limpiarErrores(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('error-input'));
}

function marcarError(inputId) {
    document.getElementById(inputId).classList.add('error-input');
}

// Validación Formulario Inscripción
const formInscripcion = document.getElementById('formInscripcion');
if(formInscripcion) {
    formInscripcion.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores('formInscripcion');
        actualizarDOM('errorInscripcion', '', false);
        actualizarDOM('successInscripcion', '', false);

        const nombre = document.getElementById('regNombre').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();

        if(!nombre || !email || !password) {
            if(!nombre) marcarError('regNombre');
            if(!email) marcarError('regEmail');
            if(!password) marcarError('regPassword');
            return actualizarDOM('errorInscripcion', 'Todos los campos son obligatorios.', true);
        }

        if(!emailRegex.test(email)) {
            marcarError('regEmail');
            return actualizarDOM('errorInscripcion', 'Formato de correo inválido.', true);
        }

        // Crear objeto usuario
        const nuevoUsuario = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            password: password
        };

        // Guardar en arreglo
        usuariosRegistrados.push(nuevoUsuario);
        console.log("Usuarios registrados:", usuariosRegistrados);

        // Feedback
        actualizarDOM('successInscripcion', `¡Bienvenido ${nombre}! Te has registrado correctamente.`, false);
        this.reset();
    });
}

// Validación Formulario Login
const formLogin = document.getElementById('formLogin');
if(formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores('formLogin');
        actualizarDOM('errorLogin', '', false);
        actualizarDOM('successLogin', '', false);

        const email = document.getElementById('logEmail').value.trim();
        const password = document.getElementById('logPassword').value.trim();

        if(!email || !password) {
            if(!email) marcarError('logEmail');
            if(!password) marcarError('logPassword');
            return actualizarDOM('errorLogin', 'Todos los campos son obligatorios.', true);
        }

        if(!emailRegex.test(email)) {
            marcarError('logEmail');
            return actualizarDOM('errorLogin', 'Formato de correo inválido.', true);
        }

        // Buscar usuario en arreglo
        const usuarioEncontrado = usuariosRegistrados.find(u => u.email === email && u.password === password);

        if(usuarioEncontrado) {
            actualizarDOM('successLogin', `¡Sesión iniciada! Bienvenido de nuevo.`, false);
            this.reset();
        } else {
            actualizarDOM('errorLogin', 'Credenciales incorrectas o usuario no registrado.', true);
        }
    });
}

// Validación Formulario Contacto
const formContacto = document.getElementById('formContacto');
if(formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores('formContacto');
        actualizarDOM('errorContacto', '', false);
        actualizarDOM('successContacto', '', false);

        const nombre = document.getElementById('contNombre').value.trim();
        const email = document.getElementById('contEmail').value.trim();
        const mensaje = document.getElementById('contMensaje').value.trim();

        if(!nombre || !email || !mensaje) {
            if(!nombre) marcarError('contNombre');
            if(!email) marcarError('contEmail');
            if(!mensaje) marcarError('contMensaje');
            return actualizarDOM('errorContacto', 'Todos los campos son obligatorios.', true);
        }

        if(!emailRegex.test(email)) {
            marcarError('contEmail');
            return actualizarDOM('errorContacto', 'Formato de correo inválido.', true);
        }

        actualizarDOM('successContacto', '¡Mensaje enviado con éxito! Te contactaremos pronto.', false);
        this.reset();
    });
}
