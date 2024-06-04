process.stdin.resume();
process.stdin.setEncoding('utf8');


const pilotos = [
        {
            "name": "Mario",
            "image": "./docs/mario.gif",
            "attributes": {
                "velocidade": 4,
                "manobrabilidade": 3,
                "poder": 3
            }
        },
        {
            "name": "Peach",
            "image": "./docs/peach.gif",
            "attributes": {
                "velocidade": 3,
                "manobrabilidade": 4,
                "poder": 2
            }
        },
        {
            "name": "Yoshi",
            "image": "./docs/yoshi.gif",
            "attributes": {
                "velocidade": 2,
                "manobrabilidade": 4,
                "poder": 3
            }
        },
        {
            "name": "Bowser",
            "image": "./docs/bowser.gif",
            "attributes": {
                "velocidade": 5,
                "manobrabilidade": 2,
                "poder": 5
            }
        },
        {
            "name": "Luigi",
            "image": "./docs/luigi.gif",
            "attributes": {
                "velocidade": 3,
                "manobrabilidade": 4,
                "poder": 4
            }
        },
        {
            "name": "Toad",
            "image": "./docs/toad.gif",
            "attributes": {
                "velocidade": 2,
                "manobrabilidade": 2,
                "poder": 5
            }
        }
    ];

    let player = null;
    let adversario = null;
    
    function inicio() {
        console.log("🚦🏎️ Corrida Mario Kart:");
        console.log("🟩 Escolha o seu Piloto:");
        for (const key in pilotos) {
            console.log(`${key} - ${pilotos[key].name} -------------------------`);
            console.log(`V ${pilotos[key].attributes.velocidade} M ${pilotos[key].attributes.manobrabilidade} P ${pilotos[key].attributes.poder}`);
        }
    
        process.stdin.once('data', (input) => {
            player = input.trim();
            clearTerminal();
            if (player >= 0 && player < pilotos.length) {
                console.log(`Você escolheu: ${pilotos[player].name}`);
                escolherAdversario();
            } else {
                console.log("Escolha inválida. Tente novamente.");
                inicio();
            }
            
        });
    }
    
    function escolherAdversario() {
        console.log("🚦🏎️ Corrida Mario Kart:");
        console.log(`Player é : ${pilotos[player].name}`);
        console.log("🟥 Escolha o seu Adversário:");
        for (const key in pilotos) {
            console.log(`${key} - ${pilotos[key].name} -------------------------`);
            console.log(`V ${pilotos[key].attributes.velocidade} M ${pilotos[key].attributes.manobrabilidade} P ${pilotos[key].attributes.poder}`);
        }
    
        process.stdin.once('data', (input) => {
            adversario = input.trim();
            if (adversario >= 0 && adversario < pilotos.length) {
                console.log(`Seu adversário é: ${pilotos[adversario].name}`);
                corrida();
            } else {
                console.log("Escolha inválida. Tente novamente.");
                escolherAdversario();
            }
            clearTerminal();
        });
    }
    
    let pontosplayer = 0;
    let pontosadversario = 0;
    let rodada = 0;
    function corrida() {
        console.log('A corrida vai iniciar!');
        const intervaloRodada = setInterval(() => {
            clearTerminal()
            console.log('PLACAR')
            console.log(`${pilotos[player].name} (${pontosplayer}) player`) 
            console.log(`${pilotos[adversario].name} (${pontosadversario})`);
        
            console.log("🛣️ pista " + (rodada + 1) + "------------");
            disputa();
        
            if (rodada > 3 && pontosplayer !== pontosadversario) {
                clearTerminal()
                if (pontosplayer > pontosadversario) {
                    console.log("😁🎉 Parabéns, você venceu!");
                    console.log(`🥇 ${pilotos[player].name} Player ${pontosplayer} \n🥈 ${pilotos[adversario].name} ${pontosadversario}`);
                    clearInterval(intervaloRodada);
                    restart()
                } else {
                    console.log("🫤 Boa sorte na próxima!");
                    console.log(`🥇 ${pilotos[adversario].name} ${pontosadversario}\n🥈 ${pilotos[player].name} Player ${pontosplayer}`);
                    clearInterval(intervaloRodada);
                    restart()
                }
            }
        
            
            rodada++;
        
        }, 5000);}

    function disputa(){
        const randompista = Math.floor(Math.random() * 3);
        const dadop = Math.floor(Math.random() * 6) + 1;
        const dadoa = Math.floor(Math.random() * 6) + 1;

        switch (randompista) {
            case 0:
                console.log("⬆️ reta");
                console.log(`seu dado ${dadop}(${pilotos[player].attributes.velocidade})`)
                console.log(`seu dado ${dadoa}(${pilotos[adversario].attributes.velocidade})`)
                if((dadop+pilotos[player].attributes.velocidade)>(dadoa+pilotos[adversario].attributes.velocidade)){
                    pontosplayer++
                    console.log(`Venceu o ${pilotos[player].name} Player`)
                }
                if((dadop+pilotos[player].attributes.velocidade)<(dadoa+pilotos[adversario].attributes.velocidade)){
                 
                    pontosadversario++
                    console.log(`Venceu o Aversario ${pilotos[adversario].name}`)                
                }
                break;
            case 1:
                console.log("➡️ curva");
                console.log(`seu dado ${dadop}(${pilotos[player].attributes.manobrabilidade})`)
                console.log(`seu dado ${dadoa}(${pilotos[adversario].attributes.manobrabilidade})`)
                if((dadop+pilotos[player].attributes.manobrabilidade)>(dadoa+pilotos[adversario].attributes.manobrabilidade)){
                    pontosplayer++
                    console.log(`Venceu o ${pilotos[player].name} Player`)
                }
                if((dadop+pilotos[player].attributes.manobrabilidade)<(dadoa+pilotos[adversario].attributes.manobrabilidade)){
                
                    pontosadversario++
                    console.log(`Venceu o Aversario ${pilotos[adversario].name}`)                
                }
                break;
            case 2:
                console.log("✴️ power-up");
                console.log(`seu dado ${dadop}(${pilotos[player].attributes.poder})`)
                console.log(`seu dado ${dadoa}(${pilotos[adversario].attributes.poder})`)
                if((dadop+pilotos[player].attributes.poder)>(dadoa+pilotos[adversario].attributes.poder)){
                    if(pontosadversario > 0){
                        pontosadversario--
                    }
                    console.log(`Venceu o ${pilotos[player].name} Player`)
                }
                if((dadop+pilotos[player].attributes.poder)<(dadoa+pilotos[adversario].attributes.poder)){
                
                    if(pontosplayer > 0){
                        pontosplayer--
                    }
                    console.log(`Venceu o  ${pilotos[adversario].name}`)                
                }
                break;
            default:
                console.log("Este caso nunca deve ocorrer");
                break;
        }
    }

    function restart(){
        console.log("\n \n \n \n \n \n");
        console.log("🔁 vamos jogar de novo?");
        console.log("0 - SIM");
        console.log("1 - NÃO");
        process.stdin.once('data', (input) => {
            if (input.trim() == 0 ) {
                clearTerminal();
                inicio();
            } else {
                process.exit(0);
            }
        });

    }
    
    function clearTerminal() {

            process.stdout.write('\x1B[2J\x1B[0f');
        
    }
    
    inicio();

