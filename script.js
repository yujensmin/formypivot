gsap.to("body", { backgroundColor: "brown", duration: 0 });

// Função para interagir com o menu e revelar a carta
document.getElementById('option-1').addEventListener('click', function() {
  console.log('Opção 1 clicada');
  revealCard(); // Chama a função para revelar a carta (mas sem o papel ainda)
});

document.querySelector("#option-1").addEventListener("click", function() {
  alert("Sweetheart, receba seu presente");
});

// Função para revelar a carta
function revealCard() {
  console.log('Revelando a carta');
  
  // Esconde o menu
  gsap.to(".menu", { opacity: 0, duration: 0.5 }); // Faz o menu desaparecer
  
  // Torna o envelope visível (sem revelar o papel ainda)
  gsap.to(".envelop", {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      console.log('Envelope revelado, esperando clique na fita');
    }
  });
}

// Variáveis para controle de mídia
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Função que redefine o tamanho das notas
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

// Função principal que habilita todas as notas
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    opacity: 1, // Garantir que o conteúdo da carta se torne visível
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

// Função que configura o papel do envelope (deve estar visível).
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "95%", // O papel começa da base
    opacity: 1,   // Garantindo que o papel seja visível desde o início
    rotation: 180, // Ajuste de rotação
    zIndex: 200,
    clipPath: "polygon(" + arr[0] + "%" + arr[1] + "%," + arr[2] + "%" + arr[3] + "%," + arr[4] + "%" + arr[5] + "%)",
    onComplete: notes_ready
  });

  // Animação do papel subindo
  gsap.to(".js-up-paper", {
    bottom: "90%", // O papel sobe
    duration: 1,  // Animação suave
    ease: "power2.inOut",
    onComplete: reveal_text // Revela o conteúdo da carta
  });
}

// Variável para controlar o clique da fita
let stickerClickCount = 0;

// Função para revelar o papel e o conteúdo após o clique na fita
function reveal_paper() {
  console.log("Revelando o papel e o conteúdo");
  stickerClickCount++; // Incrementa o contador de cliques

  // Revela o papel
  gsap.to(".envelop__paper", {
    opacity: 1, // Torna o papel visível
    duration: 0.5
  });

  // Revela o conteúdo da carta
  gsap.to(".envelop__content", {
    opacity: 1, // Torna o conteúdo visível
    duration: 0.25
  });

  // Adiciona a classe 'active' ao papel para animá-lo
  document.querySelector(".envelop__paper").classList.add("active");
  document.querySelector(".envelop__content").style.opacity = "1";
}

// Adiciona o evento de clique na fita para chamar a função 'reveal_paper'
document.querySelector(".envelop__sticker").addEventListener("click", reveal_paper);

// Função que começa a transição do envelope.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1000%", // Inicia a transição para o papel subir
    duration: 1,
    ease: "power2.inOut",
    onComplete: set_up_paper // Inicia a animação do papel
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Função que ativa a animação de corte da etiqueta.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" }); // A fita cortando
  document.body.classList.remove("scissors"); // Remove o cursor de tesoura
  document.querySelector(".js-sticker").removeEventListener("click", sticker); // Remove o evento da fita
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition); // Ativa a transição do papel ao clicar no envelope
  document.querySelector(".js-up-paper").classList.add("cursor"); // Ativa o cursor interativo para o papel
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

// Redimensionamento da janela
window.onresize = function (event) {
  recize_notes(); // Ajusta as notas ao redimensionar a janela
};
