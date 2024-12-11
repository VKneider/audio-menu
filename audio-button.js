class AudioButton extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'audio-src'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.audio = new Audio();
    this.audio.preload = 'auto'; // Precargar el audio
    this.activatedMultipleAudios = document.getElementById("audio-toggle");
  }

  connectedCallback() {
    this.render();
    this.audio.src = this.getAttribute('audio-src') || '';

    // Botón en el shadow DOM
    this.button = this.shadowRoot.querySelector('button');

    // Agregar eventos
    this.button.addEventListener('click', this.toggleAudio.bind(this));
    this.audio.addEventListener('play', this.highlightButton.bind(this));
    this.audio.addEventListener('ended', this.resetButton.bind(this));
  }

  toggleAudio() {
    if (this.audio.paused) {
      // Si el toggle está desactivado, detener otros audios
      if (!this.activatedMultipleAudios.checked) {
        document.querySelectorAll('audio-button').forEach(btn => btn.stopAudio());
      }
      this.audio.play();
    } else {
      this.stopAudio();
    }
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.resetButton(); // Resetear estilo si se detiene manualmente
  }

  highlightButton() {
    // Agregar clase para el botón activo
    this.button.classList.add('active');
  }

  resetButton() {
    // Remover clase cuando el audio termina
    this.button.classList.remove('active');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          font-size: 18px;
          padding: 15px;
          width: 100%;
          max-width: 300px;
          margin: 10px auto;
          background-color: #1e3a8a; /* Azul oscuro */
          color: white;
          border: 2px solid white;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          display: block;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s, transform 0.2s;
        }
        button:hover {
          background-color: #2563eb; /* Azul más claro */
          transform: translateY(-2px);
        }
        button:active {
          background-color: #1d4ed8; /* Azul intermedio */
        }
        /* Estilo para botón activo */
        button.active {
          background-color: #16a34a; /* Verde */
          border-color: #10b981; /* Verde claro */
        }
      </style>
      <button>${this.getAttribute('message') || 'Play'}</button>
    `;
  }
}

customElements.define('audio-button', AudioButton);