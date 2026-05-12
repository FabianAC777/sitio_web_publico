/**
 * SoundLab JavaScript
 * - Mantener los datos de beats separados de la lógica de interfaz.
 * - Usar funciones limpias para renderizar componentes y manejar eventos.
 * - Minimizar el acceso directo al DOM y reusar selectores cuando sea posible.
 */

// ===== BEATS DATA =====
const beatsData = [
    { id: 1, title: 'Midnight Vibes', artist: 'SoundLab Studios', genre: 'trap', price: 29, image: 'https://loremflickr.com/200/200/vinyl,record/all' },
    { id: 2, title: 'Reggaeton Flow', artist: 'Latino Beats', genre: 'reggaeton', price: 29, image: 'https://loremflickr.com/1200/600/music,studio/all' },
    { id: 3, title: 'Hip-Hop Thunder', artist: 'Street Beats', genre: 'hip-hop', price: 39, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=250&h=150&fit=crop' },
    { id: 4, title: 'R&B Smooth', artist: 'Urban Sounds', genre: 'r-b', price: 49, image: 'https://loremflickr.com/400/250/microphone/all' },
    { id: 5, title: 'Trap Energy', artist: 'SoundLab Studios', genre: 'trap', price: 29, image: 'https://loremflickr.com/400/250/synthesizer/all' },
    { id: 6, title: 'Reggaeton Heat', artist: 'Latino Beats', genre: 'reggaeton', price: 29, image: 'https://images.unsplash.com/photo-1534439307853-a81b042d2d17?w=250&h=150&fit=crop' },
    { id: 7, title: 'Hip-Hop Classic', artist: 'Street Beats', genre: 'hip-hop', price: 39, image: 'https://loremflickr.com/400/250/sound,engineer/all' },
    { id: 8, title: 'R&B Passion', artist: 'Urban Sounds', genre: 'r-b', price: 49, image: 'https://loremflickr.com/200/200/vinyl,record/all' },
];

// ===== CACHED DOM ELEMENTS =====
const beatsList = document.getElementById('beatsList');
const searchInput = document.getElementById('searchInput');
const playBtn = document.getElementById('playBtn');
const currentBeatTitle = document.getElementById('currentBeatTitle');

// ===== RENDER BEATS =====
function renderBeats(filter = 'todos', search = '') {
    if (!beatsList) return;
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
                        <button class="beat-play-btn" onclick="playBeat(${beat.id}, '${beat.title}')">Play Escuchar</button>
                        <button class="beat-buy-btn" onclick="buyBeat(${beat.id}, '${beat.title}')">🛒 Comprar</button>
                    </div>
                </div>
            `;
            beatsList.appendChild(beatCard);
        });
}

// ===== PLAY BEAT =====
function playBeat(id, title) {
    if (currentBeatTitle) currentBeatTitle.textContent = title;
    if (playBtn) {
        playBtn.textContent = 'Pause';
        playBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    }
}

// ===== BUY BEAT =====
window.buyBeat = function(id, title) {
    alert(`¡Gracias por tu interés en "${title}"! Sistema de compra integrado próximamente.`);
}

// ===== SELECT LICENSE =====
window.selectLicense = function(type, price) {
    alert(`Licencia ${type.toUpperCase()} seleccionada - $${price}. Redirigiendo a checkout...`);
}

// ===== EVENT DELEGATION PARA FILTROS =====
const beatsFilter = document.querySelector('.beats-filter');
if (beatsFilter) {
    beatsFilter.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderBeats(e.target.dataset.genre, searchInput ? searchInput.value : '');
        }
    });
}

// ===== BUSQUEDA =====
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const activeGenreBtn = document.querySelector('.filter-btn.active');
        const activeGenre = activeGenreBtn ? activeGenreBtn.dataset.genre : 'todos';
        renderBeats(activeGenre, this.value);
    });
}

// ===== PLAY BUTTON =====
if (playBtn) {
    playBtn.addEventListener('click', function() {
        if (this.textContent === 'Play') {
            this.textContent = 'Pause';
            this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
        } else {
            this.textContent = 'Play';
            this.style.background = 'linear-gradient(135deg, #00d4ff, #7c3aed)';
        }
    });
}

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });
}

// ===== RENDER INICIAL =====
renderBeats();

// ===== CARRUSEL LÓGICA =====
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function mostrarImagen(n) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

window.cambiarImagen = function(direccion) {
    mostrarImagen(slideIndex += direccion);
}

window.currentSlide = function(n) {
    mostrarImagen(slideIndex = n);
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if(prevBtn) prevBtn.addEventListener('click', () => cambiarImagen(-1));
if(nextBtn) nextBtn.addEventListener('click', () => cambiarImagen(1));

// ===== FORMULARIOS Y VALIDACIONES =====
let usuariosRegistrados = [];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function actualizarDOM(elementId, message, isError) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? '#ff4757' : '#2ed573';
}

function limpiarErrores(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('error-input'));
}

function marcarError(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.classList.add('error-input');
}

// =========================================================
// FUNCIÓN GENÉRICA DE VALIDACIÓN PARA FORMULARIOS
// =========================================================
function configurarFormulario(formId, suffix, campos, logicaExito) {
    const form = document.getElementById(formId);
    if(!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores(formId);
        actualizarDOM(`error${suffix}`, '', false);
        actualizarDOM(`success${suffix}`, '', false);

        let hayErrores = false;
        let msjError = 'Todos los campos son obligatorios.';
        const valores = {};

        campos.forEach(campo => {
            const inputEl = document.getElementById(campo.id);
            if (!inputEl) return;
            const valor = inputEl.value.trim();
            valores[campo.nombre] = valor;

            if(!valor) {
                marcarError(campo.id);
                hayErrores = true;
            } else if(campo.esEmail && !emailRegex.test(valor)) {
                marcarError(campo.id);
                hayErrores = true;
                msjError = 'Formato de correo inválido.';
            }
        });

        if(hayErrores) {
            return actualizarDOM(`error${suffix}`, msjError, true);
        }

        logicaExito(valores, form);
    });
}

// 1. Configurar Formulario de Inscripción
configurarFormulario(
    'formInscripcion', 
    'Inscripcion',
    [
        { id: 'regNombre', nombre: 'nombre', esEmail: false },
        { id: 'regEmail', nombre: 'email', esEmail: true },
        { id: 'regPassword', nombre: 'password', esEmail: false }
    ],
    function(valores, form) {
        const nuevoUsuario = { id: Date.now(), ...valores };
        usuariosRegistrados.push(nuevoUsuario);
        console.log("Usuarios registrados:", usuariosRegistrados);
        actualizarDOM('successInscripcion', `¡Bienvenido ${valores.nombre}! Te has registrado correctamente.`, false);
        form.reset();
    }
);

// 2. Configurar Formulario de Login
configurarFormulario(
    'formLogin', 
    'Login',
    [
        { id: 'logEmail', nombre: 'email', esEmail: true },
        { id: 'logPassword', nombre: 'password', esEmail: false }
    ],
    function(valores, form) {
        const usuarioEncontrado = usuariosRegistrados.find(u => u.email === valores.email && u.password === valores.password);
        if(usuarioEncontrado) {
            actualizarDOM('successLogin', `¡Sesión iniciada! Bienvenido de nuevo.`, false);
            form.reset();
        } else {
            actualizarDOM('errorLogin', 'Credenciales incorrectas o usuario no registrado.', true);
        }
    }
);

// 3. Configurar Formulario de Contacto
configurarFormulario(
    'formContacto', 
    'Contacto',
    [
        { id: 'contNombre', nombre: 'nombre', esEmail: false },
        { id: 'contEmail', nombre: 'email', esEmail: true },
        { id: 'contMensaje', nombre: 'mensaje', esEmail: false }
    ],
    function(valores, form) {
        actualizarDOM('successContacto', '¡Mensaje enviado con éxito! Te contactaremos pronto.', false);
        form.reset();
    }
);
