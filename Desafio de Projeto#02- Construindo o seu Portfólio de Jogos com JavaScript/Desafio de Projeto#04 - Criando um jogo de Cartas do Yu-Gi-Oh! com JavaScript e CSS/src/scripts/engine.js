const state = {
    score:{
        playerScore: Number(document.getElementById("score-player").textContent),
        computerScore: Number(document.getElementById("score-computer").textContent),
        scoreBox : document.getElementsByClassName("content__section__left__score__points"),
    }, 
    cardsSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
        button: document.getElementById("next-duel"),
    }
}

const playerSides = {
    player01: "player-cards",
    computer: "computer-cards",
}
const patchCard = "./src/assets/icons/"; 

const cardData = [
    {
        id: 0,
        name: "Dragão branco de olhos azuis",
        type: "Papel",
        img: `${patchCard}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Mago Negro",
        type: "Pedra",
        img: `${patchCard}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Tesoura",
        img: `${patchCard}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

async function getRandomCardId() {
    return Math.floor(Math.random() * cardData.length);
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player01) {
        cardImage.addEventListener("click", ()=> {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    cardImage.addEventListener("mouseover", () => {
        if (fieldSide === playerSides.player01) drawSelectCard(randomIdCard);
    });
    
    return cardImage;
}

async function updateScore(duelResult) {
    if (duelResult == "Win") {
        state.score.playerScore++;
        document.getElementById("score-player").textContent = state.score.playerScore;
    } else if (duelResult == "Lose") {
        state.score.computerScore++;
        document.getElementById("score-computer").textContent = state.score.computerScore;
    }
}

async function drawButton(vencedor) {
    state.actions.button.innerText = vencedor == "Lose" ? "PERDEU" : vencedor == "Win" ? "GANHOU" : "EMPATE";
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId) {
    const vencedor = (playerCardId == computerCardId) ? "Não teve vencedor" : (cardData[playerCardId].WinOf.includes(computerCardId) ? "Win" : "Lose");
    playAudio(vencedor);
    return vencedor;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();
    const computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
    
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    const duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore(duelResults);
    await drawButton(duelResults);
}

async function removeAllCardsImages() {
    document.querySelectorAll("#computer-cards img, #player-cards img").forEach(img => img.remove());
}

async function drawSelectCard(index) {
    const {img, name, type} = cardData[index];
    state.cardsSprites.avatar.src = img;
    state.cardsSprites.avatar.style.visibility = "visible";
    state.cardsSprites.name.style.visibility = "visible";
    state.cardsSprites.type.style.visibility = "visible";
    state.cardsSprites.name.innerText = name;
    state.cardsSprites.type.innerText = "Attribute : " + type;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardsSprites.avatar.style.visibility = "hidden";
    state.cardsSprites.name.style.visibility = "hidden";
    state.cardsSprites.type.style.visibility = "hidden";
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}


async function playAudio(status) {
    const audio = new Audio(`/src/assets/audios/${status}.wav`);
    audio.play();
}

async function init() {
    drawCards(5, playerSides.player01);
    drawCards(5, playerSides.computer);
    try {
        const bgm = document.getElementById("bgm");
        await bgm.play();
    } catch (error) {
        console.error(error);
    }
}

init();
