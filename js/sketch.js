// Axiom define a sequência inicial do L-System
let axiom = "F";
// Sentence é a sequência atual do L-System, começando com o axioma
let sentence = axiom;
// Len define o comprimento inicial dos segmentos desenhados
let len = 100;
// Angle armazena o ângulo de rotação utilizado para desenhar
let angle;
// Rules armazena as regras de reescrita do L-System
let rules = [];

// Define uma regra para o L-System: "F" se transforma em "FF+[+F-F-F]-[-F+F+F]"
rules[0] = {
  predecessor: "F",
  successor: "FF+[+F-F-F]-[-F+F+F]"
};

// Função para gerar a próxima sentença no L-System
function generate() {
  let nextSentence = ""; // Armazena a próxima sequência gerada
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i); // Caractere atual na sequência
    let found = false; // Indicador se uma regra foi encontrada para o caractere atual
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].predecessor) {
        found = true;
        nextSentence += rules[j].successor; // Aplica a regra de reescrita
        break;
      }
    }
    if (!found) {
      nextSentence += current; // Mantém o caractere atual se nenhuma regra for aplicada
    }
  }
  sentence = nextSentence; // Atualiza a sentença atual com a nova sequência gerada
  len *= 0.5; // Reduz o comprimento dos segmentos pela metade
  turtle(); // Redesenha a árvore com a nova sequência
}

// Função para limpar o canvas e reiniciar o desenho da árvore
function clearCanvas() {
  sentence = axiom; // Redefine a sequência para o axioma inicial
  len = 100; // Redefine o comprimento dos segmentos para o valor inicial
  background(255); // Limpa o fundo do canvas
  turtle(); // Desenha a árvore inicial
}

// Função de configuração inicial do p5.js
function setup() {
  const canvas = createCanvas(600, 600); // Cria o canvas de 600x600 pixels
  canvas.parent('canvas-container'); // Anexa o canvas ao contêiner HTML
  angle = radians(25); // Define o ângulo de rotação em radianos
  background(255); // Define o fundo do canvas como branco
  turtle(); // Desenha a árvore inicial
  const generateButton = select("#generate"); // Seleciona o botão "Gerar Nova Árvore"
  generateButton.mousePressed(generate); // Associa a função generate ao evento de clique do botão
  const clearButton = select("#clear"); // Seleciona o botão "Limpar"
  clearButton.mousePressed(clearCanvas); // Associa a função clearCanvas ao evento de clique do botão
}

// Função para desenhar a árvore fractal no canvas
function turtle() {
  background(255); // Limpa o fundo do canvas
  resetMatrix(); // Reseta a matriz de transformação
  translate(width / 2, height); // Move a origem para o centro da base do canvas
  stroke(0, 100); // Define a cor do traço com 100 de opacidade
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i); // Caractere atual na sequência
    if (current == "F") {
      line(0, 0, 0, -len); // Desenha uma linha para frente
      translate(0, -len); // Move a origem para o final da linha desenhada
    } else if (current == "+") {
      rotate(angle); // Rotaciona no sentido horário
    } else if (current == "-") {
      rotate(-angle); // Rotaciona no sentido anti-horário
    } else if (current == "[") {
      push(); // Salva o estado atual da matriz de transformação
    } else if (current == "]") {
      pop(); // Restaura o estado anterior da matriz de transformação
    }
  }
}
