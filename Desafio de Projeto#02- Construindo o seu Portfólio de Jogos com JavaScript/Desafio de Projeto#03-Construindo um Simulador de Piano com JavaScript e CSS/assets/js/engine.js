const teclasDoPiano = document.querySelectorAll(".piano__virtual__teclas .piano__virtual__teclas_tecla");
let teclasPossiveis = [];
let audio = new Audio("assets/sounds/a.wav");
const botaoVolume = document.querySelector(".piano__virtual__cabecalho__volume input");
const botaoTeclas = document.querySelector(".piano__virtual__cabecalho__botao input");

const playTune = (piano__virtual__teclas_tecla) => {
    audio.src = `assets/sounds/${piano__virtual__teclas_tecla}.wav`;
    audio.play();
    const teclaClicada = document.querySelector(`[data-tecla="${piano__virtual__teclas_tecla}"]`);

    teclaClicada.classList.add("active");
    setTimeout(()=>{
        teclaClicada.classList.remove("active");
    }, 150);
}

teclasDoPiano.forEach((piano__virtual__teclas_tecla) => {
    piano__virtual__teclas_tecla.addEventListener("click", () => playTune(piano__virtual__teclas_tecla.dataset.tecla));
    teclasPossiveis.push(piano__virtual__teclas_tecla.dataset.tecla);
});

document.addEventListener("keydown", (e) => {
    if (teclasPossiveis.includes(e.key)) {
        playTune(e.key);
    }
});

const manipulacaoVolume = (e) => {
    audio.volume = e.target.value;
}

botaoVolume.addEventListener("input", manipulacaoVolume);

const toggleTeclas = () => {
    teclasDoPiano.forEach(piano__virtual__teclas_tecla => piano__virtual__teclas_tecla.classList.toggle("hide"));
}

botaoTeclas.addEventListener("click", toggleTeclas);