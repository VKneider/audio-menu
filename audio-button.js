class AudioButton extends HTMLElement {
    static get observedAttributes() {
      return ['message', 'audio-src'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.audio = new Audio();
      this.audio.preload = 'auto'; // Precargar el audio
    }
  
    connectedCallback() {
      this.render();
      this.audio.src = this.getAttribute('audio-src') || '';
      this.shadowRoot.querySelector('button').addEventListener('click', this.playAudio.bind(this));
    }
  
    attributeChangedCallback(attr, oldValue, newValue) {
      if (attr === 'message') {
        this.shadowRoot.querySelector('button').textContent = newValue || 'Play';
      }
      if (attr === 'audio-src') {
        this.audio.src = newValue || '';
        this.audio.load(); // Cargar el audio si cambia el atributo
      }
    }
  
    playAudio() {
      document.querySelectorAll('audio-button').forEach(btn => btn.stopAudio());
      this.audio.play();
    }
  
    stopAudio() {
      this.audio.pause();
      this.audio.currentTime = 0;
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
        </style>
        <button>${this.getAttribute('message') || 'Play'}</button>
      `;
    }
  }
  
  customElements.define('audio-button', AudioButton);
  