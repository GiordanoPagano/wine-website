document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MENU MOBILE TOGGLE --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
            // Semplice toggle in CSS o via JS
            if(mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            } else {
                mainNav.classList.add('active');
            }
        });
    }

    /* --- 2. DATABASE DEI VINI (Per i dettagli dinamici) --- */
    const viniData = {
        barolo: {
            nome: "Barolo DOCG 2018",
            tipo: "Rosso • Piemonte",
            prezzo: "€ 45,00",
            immagine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
            descrizione: "Il re dei vini, un vino maestoso e di grande struttura. Prodotto con uve Nebbiolo in purezza, affinato in botti di rovere per almeno 38 mesi.",
            abbinamenti: "Arrosti di carne rossa, brasati, selvaggina e formaggi stagionati.",
            annata: "2018",
            gradazione: "14.5% Vol."
        },
        vermentino: {
            nome: "Vermentino di Sardegna DOC",
            tipo: "Bianco • Sardegna",
            prezzo: "€ 18,50",
            immagine: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
            descrizione: "Un vino bianco fresco e sapido, che porta con sé i profumi della brezza marina e della macchia mediterranea. Ottimo bilanciamento acido.",
            abbinamenti: "Piatti a base di pesce, crostacei, risotti di mare e antipasti leggeri.",
            annata: "2022",
            gradazione: "13.0% Vol."
        },
        franciacorta: {
            nome: "Franciacorta Brut DOCG",
            tipo: "Bollicine • Lombardia",
            prezzo: "€ 32,00",
            immagine: "https://images.unsplash.com/photo-1594356499859-9a73841961e6?auto=format&fit=crop&w=800&q=80",
            descrizione: "Ottenuto con metodo classico e rifermentazione in bottiglia. Perlage finissimo, cremoso e di grande eleganza al palato.",
            abbinamenti: "Aperitivi raffinati, crudité di mare, sushi e primi piatti delicati.",
            annata: "2019",
            gradazione: "12.5% Vol."
        }
    };

    /* --- 3. CREAZIONE DINAMICA DELLA FINESTRA MODALE (DETTAGLI VINO) --- */
    // Creiamo il contenitore della modale direttamente via JS se non esiste
    const modalHTML = `
        <div id="wineModal" class="wine-modal-overlay">
            <div class="wine-modal-content">
                <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-grid">
                    <div class="modal-img-container">
                        <img id="modalImg" src="" alt="Vino">
                    </div>
                    <div class="modal-details">
                        <span id="modalType" class="wine-type"></span>
                        <h2 id="modalTitle"></h2>
                        <p id="modalDesc" class="wine-desc"></p>
                        
                        <div class="modal-specs">
                            <div><strong>Annata:</strong> <span id="modalAnnata"></span></div>
                            <div><strong>Gradazione:</strong> <span id="modalGradazione"></span></div>
                            <div><strong>Abbinamenti:</strong> <span id="modalAbbinamenti"></span></div>
                        </div>

                        <div class="modal-footer">
                            <span id="modalPrice" class="price"></span>
                            <button id="addToCartBtn" class="btn-primary"><i class="fa-solid fa-cart-plus"></i> Aggiungi alla Richiesta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inseriamo la modale nel body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('wineModal');
    const modalClose = modal.querySelector('.modal-close');
    const openButtons = document.querySelectorAll('.open-detail');

    // Funzione per aprire la modale con i dati del vino scelto
    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const wineId = button.getAttribute('data-id');
            const data = viniData[wineId];

            if(data) {
                document.getElementById('modalImg').src = data.immagine;
                document.getElementById('modalType').textContent = data.tipo;
                document.getElementById('modalTitle').textContent = data.nome;
                document.getElementById('modalDesc').textContent = data.descrizione;
                document.getElementById('modalAnnata').textContent = data.annata;
                document.getElementById('modalGradazione').textContent = data.gradazione;
                document.getElementById('modalAbbinamenti').textContent = data.abbinamenti;
                document.getElementById('modalPrice').textContent = data.prezzo;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Blocca lo scroll della pagina sotto
            }
        });
    });

    // Funzione per chiudere la modale
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Tasto "Aggiungi alla richiesta" interattivo
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        const wineName = document.getElementById('modalTitle').textContent;
        alert(`Hai aggiunto "${wineName}" alla tua lista di richiesta! Vai al modulo contatti in fondo alla pagina per inviare l'ordine.`);
        closeModal();
        // Scorri automaticamente verso la sezione contatti
        document.getElementById('contatti').scrollIntoView({ behavior: 'smooth' });
    });

});