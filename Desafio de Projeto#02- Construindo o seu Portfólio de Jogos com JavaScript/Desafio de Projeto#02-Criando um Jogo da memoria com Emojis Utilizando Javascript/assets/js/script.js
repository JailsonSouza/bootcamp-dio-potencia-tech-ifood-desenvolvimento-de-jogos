const emojis = [
    "🐱","🐱","🐺","🐺","🐵","🐵","🦝","🦝","🐷","🐷","🐮","🐮","🦓","🦓","🐨","🐨"
];
let cartasAbertas = [];
let emojisEmbaralhados = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let indice = 0; indice < emojis.length; indice++) {
    let carta = document.createElement("div");
    carta.className = "item";
    carta.innerHTML = emojisEmbaralhados[indice];
    carta.onclick = quandoClicar;
    document.querySelector(".cartas").appendChild(carta);
}

function quandoClicar() {
    if (cartasAbertas.length < 2) {
        this.classList.add("cartaAberta");
        cartasAbertas.push(this);
    }
    
    if (cartasAbertas.length === 2) {
        setTimeout(verificarJogo, 500);
    }
}

function verificarJogo() {
    if (cartasAbertas[0].innerHTML === cartasAbertas[1].innerHTML) {
        cartasAbertas[0].classList.add("cartaCorrespondente");
        cartasAbertas[1].classList.add("cartaCorrespondente");
    } else {
        cartasAbertas[0].classList.remove("cartaAberta");
        cartasAbertas[1].classList.remove("cartaAberta");
    }

    cartasAbertas = [];

    if (document.querySelectorAll(".cartaCorrespondente").length === emojis.length){
        mostrarMensagemVitoria();  
    }
}

function mostrarMensagemVitoria() {
    const mensagemVitoria = document.getElementById("mensagemVitoria");
    mensagemVitoria.style.display = "block";
    
    setTimeout(() => {
        mensagemVitoria.style.display = "none";
    }, 6000);
}