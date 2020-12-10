/*
UFO FISHING 2020.1
Isabela Zamith e Felippe Quintiere
*/

//variáveis globais
var bga
var cv
var ctx
var musicafundo
var temporizador;
//Pontuação
var pontuacao = 0;
//Fase
var fase = 1;
var velo;
var imagem = new Image()
//tamanhos largura e altura de cada imagem
var tamanhoAw = 46;
var tamanhoAh = 67;
var px;
var py;
var fig;
//assets
var alien = "assets/alien.png";
var vaca = "assets/vaca.png";
var humano = "assets/astro.png";
//vidas
var vidas = 3
var s
var personagens = [humano,alien,vaca];
var chances = [humano,humano,humano,alien,alien,alien,alien,vaca];
var personagensExib = [];

function ganhou() {
	ctx.fillStyle = "rgba(200,0,200,1)";
	ctx.fillRect(0,0,cv.width,cv.height);
	document.getElementById('pontuacao').style.display='none';
	document.getElementById('fase').style.display='none';
	document.getElementById('vidas').style.display='none';
	ctx.fillStyle = "#85FF64";
	ctx.font = "20px 'Press Start 2P', cursive";
	ctx.fillText("Vitória", 450, 430)
	ctx.font = "10px 'Press Start 2P', cursive";
	ctx.fillText("Atualize a página para jogar novamente", 330, 400)
}

function overlay(){
	ctx.fillStyle = "rgba(200,0,200,0.7)";
	ctx.fillRect(0,0,cv.width,cv.height);
}
//Overlay mostrando que passou de fase
function ExibFase2() {
	overlay()
	ctx.font = "60px 'Press Start 2P', cursive";
	ctx.fillStyle = "#85FF64";
	ctx.fillText("Fase 2", 300, 350)
	ctx.font = "20px 'Press Start 2P', cursive";
	ctx.fillText("200 pontos para a próxima", 250, 430)
}
//Overlay mostrando que passou de fase
function ExibFase3() {
	overlay()
	ctx.font = "60px 'Press Start 2P', cursive";
	ctx.fillStyle = "#85FF64";
	ctx.fillText("Fase 3", 300, 300)
	ctx.font = "20px 'Press Start 2P', cursive";
	ctx.fillText("300 pontos para a vitória", 250, 430)
}

function incluir() {
		x = Math.floor(Math.random()* (cv.width-40))
		y = Math.floor(Math.random()* (cv.height-40))
		var i = Math.floor(Math.random()* (chances.length))
		personagensExib.push([chances[i],x,y])
}

function velocidade(min,max) {
	velo = Math.floor(Math.random() * (max - min) + min);
}

function mudaFase() {
	if (fase==1 && pontuacao>=100) {
		fase=2
		pontuacao=0
		personagensExib=[]
		setTimeout(
			ExibFase2()
			, 3000);
		musicafundo.playbackRate=2;
}

	else if (fase==2 && pontuacao>=200) {
		fase=3
		pontuacao=0
		personagensExib=[]
		setTimeout(
			ExibFase3()
			, 3000);
		musicafundo.playbackRate=2.5;
	}
}
//pontuacao
function pontuar() {
	if (fig==humano) {
		vidas=vidas-1
		loseLifeSound()
		console.log("humano")
	}

	else if (fig==alien) {
		pontuacao=pontuacao+5
		 pointsSound()
		console.log("alien")
	}
	else if (fig==vaca) {
		pontuacao=pontuacao+30
		 pointsSound()
		console.log("vaca")
	}
	document.getElementById('mostraPontuacao').innerHTML=pontuacao
	document.getElementById('mostraVidas').innerHTML=vidas
	mudaFase()

}
//evento do mouse, se a posição do clique está dentro da imagem, pontua
function pressMouse(e) {
	var posX= e.clientX - cv.offsetLeft + window.pageXOffset;
	var posY= e.clientY - cv.offsetTop + window.pageYOffset;
	for (var i = 0; i<personagensExib.length; i++) {
		fig=personagensExib[i][0];
		px=personagensExib[i][1];
		py=personagensExib[i][2]

		if ((posX>= px && posX <=(px+tamanhoAw)) &&
		(posY>= py && posY <=(py+tamanhoAh))){
			pontuar();
			personagensExib.splice(i,1)
			return
		}
	}
}
//desenha os personagens do array de exibição
function desenhaPersonagem(){
	var i;
	for (i=0; i<personagensExib.length;i++) {
		imagem.src=personagensExib[i][0]
		ctx.drawImage(imagem,personagensExib[i][1],personagensExib[i][2],tamanhoAw,tamanhoAh)
	}
}
//adiciona ou retira personagens do array de exibição
function sorteio() {
	if (personagensExib.length<6) {
			incluir()
	}
	else{
		setTimeout(function ret(){
			s =  Math.floor(Math.random()* 3)
			personagensExib.splice(s,1)
		},(velocidade (50,100)))
	}
}

//monta o cenário e exibe informações
function setup(){
	//posiciona e exibe elementos do jogo
	document.getElementById('topo').style.display = 'none';
	document.getElementById('canvas').style.display = 'block';
	cv.width=cv.width
	bga = document.getElementById("asset_bg1");
	ctx.drawImage(bga, 0, 0, cv.width, cv.height);
	document.getElementById('pontuacao').style.display='block';
	document.getElementById('fase').style.display='block';
	document.getElementById('vidas').style.display='block';
	document.getElementById('mostraPontuacao').innerHTML=pontuacao;
	document.getElementById('mostraFase').innerHTML=fase;
	//evento de mouse
	cv.addEventListener('click',pressMouse,false);
}
//fim do jogo
function fim() {
	ctx.fillStyle = "rgba(200,0,200,1)";
	ctx.fillRect(0,0,cv.width,cv.height);
	document.getElementById('pontuacao').style.display='none';
	document.getElementById('fase').style.display='none';
	document.getElementById('vidas').style.display='none';
	ctx.fillStyle = "#85FF64";
	ctx.font = "20px 'Press Start 2P', cursive";
	ctx.fillText("Fim de jogo", 400, 430)
	ctx.font = "10px 'Press Start 2P', cursive";
	ctx.fillText("Atualize a página para jogar novamente", 330, 460)
}
//inicia o jogo e chama todas as funções
function iniciarJogo() {
	//se a quantidade de vidas chegou a zero, o jogo não continua
	if (vidas==0) {
		musicafundo.pause();
		youLoseSound()
		fim()
		return
	}
	else if (fase==3 && pontuacao>=300) {
		musicafundo.pause();
		victorySound()
		ganhou()
		return
	}
	//caso contrário
		setup();
		sorteio();
		desenhaPersonagem();

}
//efeitos sonoros
function playMusic() {
	musicafundo = document.getElementById("music");
	musicafundo.play();
	musicafundo.volume = 0.02;
	musicafundo.loop = true;
}
function loseLifeSound() {
	var vid = document.getElementById("life");
	vid.play();
	vid.volume = 0.05;
	vid.loop = false;
}
function pointsSound() {
	var vid = document.getElementById("points");
	vid.play();
	vid.volume = 0.05;
	vid.loop = false;
}
function victorySound() {
	var vid = document.getElementById("victory");
	vid.play();
	vid.volume = 0.05;
	vid.loop = false;
}
function youLoseSound() {
	var vid = document.getElementById("lose");
	vid.play();
	vid.volume = 0.05;
	vid.loop = false;
}

//substitui as instruções pelo canvas de jogo
function Iniciar() {
	perdeu = false
	playMusic();
	cv = document.getElementById("canvas");
	ctx = cv.getContext("2d");
	ctx.clearRect(0,0,cv.width,cv.height)
	temporizador = setInterval(iniciarJogo,5000,cv,ctx);
}
