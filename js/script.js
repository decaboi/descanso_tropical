

// Base de datos de preguntas y respuestas
const faqJuangriego = {
  ubicacion: {
    respuesta: "📍 Estamos a 300 metros de la bahía de Juangriego y a 5 min caminando del Mirador de La Galera. ¡Zona tranquila con restaurantes locales cerca!",
    keywords: ["ubicado", "dónde queda", "zona", "cerca", "mirador", "galera"]
  },
  pago: {
    respuesta: "💵 Aceptamos dólares en efectivo (USD), transferencias bancarias y Zelle. ¡Sin recargos por pagos en efectivo!",
    keywords: ["pago", "dólares", "efectivo", "USD", "tarjeta", "divisas"]
  },
  playa: {
    respuesta: "🏖️ La playa más cercana es Playa Caribe (oleaje suave, apta para niños). ¡Prestamos sombrillas gratis! Traje de baño recomendado 😊",
    keywords: ["playa", "mar", "nadar", "arena", "sombrilla", "niños"]
  },
  wifi: {
    respuesta: "📶 Wi-Fi gratis en todas las áreas. En habitaciones: señal buena; en áreas comunes: ¡súper reforzada! Perfecto para trabajar o subir fotos.",
    keywords: ["internet", "wifi", "conexión", "señal", "red"]
  },
  transporte: {
    respuesta: "🚗 Traslado desde aeropuerto: $20 USD/vehículo. ¡Reserva con 24h de anticipación! También alquilamos motos ($15 USD/día).",
    keywords: ["llegar", "aeropuerto", "transporte", "taxi", "moto", "alquiler"]
  },
  luz: {
    respuesta: "⚡ ¡Sí! Contamos con planta eléctrica 24/7. Cortes de luz no afectarán tu comodidad. Neveras y A/C siempre funcionando.",
    keywords: ["luz", "generador", "planta", "electricidad", "corte"]
  },
  tour: {
    respuesta: "⛵ ¿Paseo en peñero al atardecer? ¡Claro! $25 USD/persona (incluye bebida y snack). Reserve en recepción.",
    keywords: ["tour", "paseo", "peñero", "atardecer", "lancha", "excursión"]
  },
  comida: {
    respuesta: "🍤 Recomendamos: 'El Peñero' (mariscos frescos, 200m) y 'La Casa del Pescador' (económico). Ambos aceptan USD en efectivo.",
    keywords: ["comer", "restaurante", "mariscos", "pescado", "cena", "comida"]
  },
  default: {
    respuesta: "❓ ¡Ups! No entendí bien. ¿Podrías reformular? Ejemplos: '¿Aceptan dólares?', '¿Cómo llegar?'. O escribe *AGENTE* para hablar con una persona 😊"
  }
};

// Función para responder al usuario
function responderBot(mensajeUsuario) {
  const texto = mensajeUsuario.toLowerCase().trim();

  for (const [key, data] of Object.entries(faqJuangriego)) {
    if (key !== "default" && data.keywords.some(kw => texto.includes(kw))) {
      return data.respuesta;
    }
  }

  if (texto.includes("agente") || texto.includes("humano")) {
    return "👩‍💼 ¡Claro! Un asesor te contactará en unos minutos. Mientras tanto, ¿qué necesitas saber?";
  }

  if (texto.includes("reservar") || texto.includes("reserva")) {
    return "🏨 ¡Excelente! Puedes hacer tu reserva directamente con nosotros ➡️ <a href='https://wa.me/584123456789'  target='_blank' style='color:#007BFF;'>Contáctanos por WhatsApp</a>";
  }

  return faqJuangriego.default.respuesta;
}

// Eventos del chatbot
const chatBtn = document.querySelector('.chatbot-btn');
const chatWindow = document.getElementById('chatbotWindow');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

function toggleChatbot() {
  const chatWindow = document.getElementById("chatbotWindow");
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  // Mensaje del usuario
  const userMsg = document.createElement('div');
  userMsg.classList.add('message', 'user');
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  // Respuesta del bot
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.classList.add('message', 'bot');
    botMsg.innerHTML = responderBot(text);
    chatMessages.appendChild(botMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Toggle menú responsive
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 767) {
      document.getElementById("mainNav").style.display = 'none';
    }
  });
});
