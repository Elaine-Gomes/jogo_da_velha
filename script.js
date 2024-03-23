const celulas = document.querySelectorAll(".cell");
const statusTxt = document.querySelector('.status');

const jogo = ["", "", "", "", "", "", "", "", ""];


const possibilidadesDeVencer = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
];

let jogadorDaVez = '🐶'
let jogoAtivo = true;

console.log(celulas);

function reiniciar(){
    jogo.fill('')
    jogoAtivo = true;
    statusTxt.innerHTML = `É a vez do ${jogadorDaVez}`
    statusTxt.style.color = 'black'

    celulas.forEach(celula=>{
        celula.innerHTML = ''
        celula.style.cursor = 'pointer'
        celula.style.backgroundColor = ''
    })

}

function manipularCliqueNaCelula(e) {
    let celulaClicada = e.target
    let indexCelulaClicada = parseInt(celulaClicada.getAttribute('data-index'))


    if(jogo[indexCelulaClicada] !== '' || !jogoAtivo){
        return
    }

    adicionarCelulaClicada(celulaClicada,indexCelulaClicada)
    verificarGanhador()
   
    celulaClicada.style.cursor = 'default';
    // console.log(celulaClicada);

    if(jogo[indexCelulaClicada] === '🐶'){
        celulaClicada.style.backgroundColor = 'blue'
    }else{
        celulaClicada.style.backgroundColor = 'green'
    }
}

function adicionarCelulaClicada(celulaClicada,indexCelulaClicada){
    celulaClicada.innerHTML = jogadorDaVez
    jogo[indexCelulaClicada] = jogadorDaVez

}

function verificarGanhador(){
    let rodadaGanha = false;
    
    for (let index = 0; index < possibilidadesDeVencer.length; index++) {
        let condicoesPossiveis = possibilidadesDeVencer[index]

        let a = jogo[condicoesPossiveis[0]]
        let b = jogo[condicoesPossiveis[1]]
        let c = jogo[condicoesPossiveis[2]]

        if(a == '' || b === '' || c === ''){
            continue
        }

        if(a === b && b === c){
            rodadaGanha = true;
            break;
        }
        console.log(condicoesPossiveis)

        let rodadaEmpatada = !jogo.includes('')

        if(rodadaEmpatada){
            statusTxt.style.color = 'red'
            statusTxt.innerHTML = `Empate!!`
            jogoAtivo = false;
            return;
        }
    }

    if(rodadaGanha){
        statusTxt.innerHTML = `O vencedor é ${jogadorDaVez}`
        jogoAtivo = false;
        return
    }

    alternarJogador()

}

function alternarJogador(){
     jogadorDaVez = jogadorDaVez === '🐶'? '🐱': '🐶';
     statusTxt.innerHTML = `É a vez do ${jogadorDaVez}`
    
}

celulas.forEach((celula) => {
  celula.addEventListener("click", manipularCliqueNaCelula);
});

