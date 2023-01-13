 const jogador = process.argv[2]

 const pc = "tesoura"

 if(jogador === pc){
    console.log(`Você escolheu ${jogador} e o computador escolheu ${pc}. Empate!`);
 } else if(jogador === "papel"){
    console.log(`Você escolheu ${jogador} e o computador escolheu ${pc}. Você perdeu!`);
 } else if(jogador === "pedra"){
    console.log(`Você escolheu ${jogador} e o computador escolheu ${pc}. Você ganhou!`);
 }