//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15
let raio = diametro / 2 ;

//Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variáveis da Raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 8
let raqueteAltura = 80

//Variáveis do Oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do Jogo
let raquetada; 
let ponto;
let trilhasonora;

// Chance de Errar
let chanceDeErrar = 0


function preload(){
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.wav")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha; 
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio <0){
    velocidadeYBolinha *= -1;
  }  
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura)
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = 
collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - chanceDeErrar ;
  yRaqueteOponente += velocidadeYOponente
  if(pontosDoOponente > meusPontos){
    chanceDeErrar = 100;
  }
  if(pontosDoOponente < meusPontos && chanceDeErrar > 50){
    chanceDeErrar -= 5 
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(250, 10, 40, 20);
  fill(255);
  text(meusPontos, 270, 26);
  fill(color(255,140,0));
  rect(350, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 370,26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  } 
  
}