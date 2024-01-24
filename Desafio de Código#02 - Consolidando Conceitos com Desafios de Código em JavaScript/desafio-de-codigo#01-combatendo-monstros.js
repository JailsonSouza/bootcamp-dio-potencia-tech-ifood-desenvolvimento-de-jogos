//Desafios JavaScript na DIO têm funções "gets" e "print" acessíveis globalmente:
//- "gets" : lê UMA linha com dado(s) de entrada (inputs) do usuário;
//- "print": imprime um texto de saída (output), pulando linha.

// Lê a jogada do personagem:
var jogadaPersonagem = parseInt(gets());

// Lê a jogada do monstro:
var jogadaMonstro = parseInt(gets());

// validando se as jogadas estão no intervalo de 1 a 6

if (!isNaN(jogadaPersonagem) && jogadaPersonagem >= 1 && jogadaPersonagem <= 6 && !isNaN(jogadaMonstro) && jogadaMonstro >= 1 && jogadaMonstro <= 6) {
  // TODO: Crie uma função ou outro conceito de lógica de programação para realizar o combate e retornar o resultado:
  
  function combate() {
  //TODO: Implemente uma estrutura condicional if/else para verificar a jogada do personagem e a jogada do monstro, prossiga: 
    if (jogadaPersonagem > jogadaMonstro) {
      return "Você venceu a batalha!";
    } else if (jogadaPersonagem < jogadaMonstro){
      return "Você perdeu a batalha!";
    } else {
      return "Foi um empate!";
    }
  }
  
  // TODO: Agora chame a função para realizar o combate para exibir o resultado:
  var resultado = combate();
  print(resultado);
} else {
  console.log("Alguma das jogadas informada contêm valor informado inválido! os valores devem está no intervalo entre 1 e 6.");
}
