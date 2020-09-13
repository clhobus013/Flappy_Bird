console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const fundo = {
  spriteX: 390, 
  spriteY: 0,
  largura: 275,
  altura: 204, 
  x: 0,
  y: canvas.height - 204,
  desenha(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      fundo.x, fundo.y,
      fundo.largura, fundo.altura,
    );
    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      (fundo.x+fundo.largura), fundo.y,
      fundo.largura, fundo.altura,
    );
  }
}

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 113,
  x: 0,
  y: canvas.height-113,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );
  
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x+chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  }
}

const flappyBird = { //estrutura para o flappy bird, criando uma variavel
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x:15,
  y:50,
  gravidade: 0.25,
  velocidade: 0,
  atualiza(){
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenha(){
    contexto.drawImage(
      sprites, 
      flappyBird.spriteX, flappyBird.spriteY, //Sprite x, Spritey distancia que a img ta da borda
      flappyBird.largura, flappyBird.altura, //swidth, sheight, tamanho do sprite
      flappyBird.x, flappyBird.y, //dx, dy, local q vai ser colocada a sprite na tela
      flappyBird.largura, flappyBird.altura, // dwidth, dheight tamnho da sprite
    );
  }

}

const telaInicio = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2)-174/2,
  y: 50,
  desenha(){
    contexto.drawImage(
      sprites,
      telaInicio.spriteX, telaInicio.spriteY,
      telaInicio.largura, telaInicio.altura,
      telaInicio.x, telaInicio.y,
      telaInicio.largura, telaInicio.altura,
    )
  }

}

let telaAtiva = {};
function mudaParaTela(novaTela){
  telaAtiva = novaTela;
}

const telas = {
  INICIO: {
    desenha(){
      fundo.desenha();
      chao.desenha();
      flappyBird.desenha();
      telaInicio.desenha();
    },
    click(){
      mudaParaTela(telas.JOGO);
    },
    atualiza(){

    }
  }
};

telas.JOGO = {
  desenha(){
    fundo.desenha();
    chao.desenha();
    flappyBird.desenha();
  },
  atualiza(){
    flappyBird.atualiza();
  }
};

function loop(){
  telaAtiva.desenha();
  telaAtiva.atualiza();
  requestAnimationFrame (loop); //fps
};

window.addEventListener('click',function(){
  if(telaAtiva.click){
    telaAtiva.click();
  }
});

mudaParaTela(telas.INICIO);
loop();