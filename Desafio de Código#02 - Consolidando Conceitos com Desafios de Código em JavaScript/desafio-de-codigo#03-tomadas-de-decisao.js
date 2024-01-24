// Solicita ao usuário que insira o nome do personagem:
const nomePersonagem = gets();

// Solicita ao usuário que escolha entre "Atacar" ou "Fugir":
const acaoEscolhida = gets();
  
// TODO: Implemente uma solução utilizando lógica de programação;
if (acaoEscolhida === "Atacar" || acaoEscolhida === "Fugir") {
//TODO: Verifique a ação escolhida e exibir a mensagem correspondente:
  console.log(`${nomePersonagem} escolheu ${acaoEscolhida}!`);
} else {
  console.log("Tente novamente");
}
