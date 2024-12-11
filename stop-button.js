class StopButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.shadowRoot.querySelector('button').addEventListener('click', this.stopAllAudios.bind(this));
    }
  
    stopAllAudios() {
      // Detener todos los audios de los botones <audio-button>
      document.querySelectorAll('audio-button').forEach(button => button.stopAudio());
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
            background-color: purple; /* Azul */
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
            background-color: #1e3a8a; /* Azul oscuro */
            transform: translateY(-2px);
          }
          button:active {
            background-color: #1d4ed8; /* Azul intermedio */
          }
        </style>
        <button>Stop All</button>
      `;
    }
  }
  
  customElements.define('stop-button', StopButton);
  