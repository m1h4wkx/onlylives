function startBuffering() {
  document.querySelector('.play-button').style.display = 'none';
  document.getElementById('loader').style.display = 'block';
  setTimeout(function () {
    window.open("https://href.li/?http://acort.link/Y6fyh8Ev", "_blank");
    document.querySelector('.play-button').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
  }, 1000);
}

    function toggleChatInput() {
      const chatInput = document.getElementById('chatInputContainer');
      if (chatInput.style.display === 'flex') {
        chatInput.style.display = 'none';
      } else {
        chatInput.style.display = 'flex';
        document.getElementById('userMessage').focus();
      }
    }

    function redirectDirectly() {
      window.location.href = "https://href.li/?http://acort.link/mB5zJw";
      return false;
    }

const chatData = [
  "💬 Andrés: tu voz es súper linda 🥰",
  "💬 Camila: yo también quiero salir en el live jeje",
  "💬 Sofi_23 se unió al EN VIVO",
  "💬 Valentina: qué linda estás 😍",
  "💬 Alex: ese outfit rosa está genial🌸",
  "💬 Leo: pareces un ángel  🥰",
  "💬 Paula: este en vivo está buenísimo",
  "💬 Diego: ahora sí me animaste 😄👋",
  "💬 Andre: te ves hermosa como siempre 😍",
  "💬 Nico_07: alguien más desde Argentina 🌸",
  "💬 Raulito: ya somos +200 conectados!!",
  "💬 Sofía: no quiero que se acabe este live 🥹"
];

const chatContainer = document.querySelector(".chat-messages");
let i = 0;

setInterval(() => {
  if (i < chatData.length) {
    const div = document.createElement("div");
    div.className = "chat-message scroll-up";
    div.textContent = chatData[i];
    chatContainer.appendChild(div);

    // Eliminar el mensaje cuando termine la animación
    setTimeout(() => {
      chatContainer.removeChild(div);
    }, 8000);

    i++;
  }
}, 1300);

