document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const addAudioBtn = document.getElementById('add-audio');
    const fileInput = document.getElementById('audio-file');
    const messageInput = document.getElementById('audio-message');
    
    let isFileLoaded = false;
  
    const validateInputs = () => {
      const message = messageInput.value.trim();
      addAudioBtn.disabled = !isFileLoaded || !message;
    };
  
    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      validateInputs();
    });
  
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      fileInput.value = '';
      messageInput.value = '';
      isFileLoaded = false;
      validateInputs();
    });
  
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        isFileLoaded = true;
        validateInputs();
      } else {
        isFileLoaded = false;
        validateInputs();
      }
    });
  
    messageInput.addEventListener('input', validateInputs);
  
    addAudioBtn.addEventListener('click', () => {
      const message = messageInput.value.trim();
      const file = fileInput.files[0];
  
      if (!isFileLoaded || !message) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      const fileURL = URL.createObjectURL(file);
  
      const dynamicAudiosContainer = document.getElementById('audios');
      const audioButton = document.createElement('audio-button');
      audioButton.setAttribute('message', message);
      audioButton.setAttribute('audio-src', fileURL);
  
      dynamicAudiosContainer.appendChild(audioButton);
  
      closeModalBtn.click();
    });
  });
  