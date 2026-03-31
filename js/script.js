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
