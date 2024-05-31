// Código não funciona;
const fs = require('fs');
const { performance } = require('perf_hooks');

function lerJson() {
        fs.readFile('arquivo_do_automato.aut', 'utf8');
        const automato = JSON.parse(arquivo);
        return automato;
}

function lerTestes() {

     fs.readFile('arquivo_de_testes.in', 'utf8');
        
            const linhas = arquivo.split('\n');
            const entradas = linhas.map(linha => linha.split(';'));
            return entradas;       
}

function resultado(entrada, automato) {

    let estado = automato.initial;

    for (let i = 0; i < entrada.length; i++) {

        let transicao = null;

        for (let j = 0; j < automato.transitions.length; j++) {
            let teste = automato.transitions[j];
            if (teste.from === estado && teste.read === entrada[i]) {
                transicao = teste;
                break;
            }
        }

        if (!transicao) {
            return false;
        }
        
        estado = transicao.to;
    }

    return automato.final[0] === estado;
}
     function main() {
   
        const automato = lerJson();
        const entradas = lerTestes();

        const resultados = entradas.map(function(entrada) {

        const inicio = performance.now();
        const aceita = resultado(automato, entrada[0]);
        const fim = performance.now();
        const tempo = fim - inicio;
        const resultadoEsperado = entrada[1];
        const resultadoObtido = 0;

            if(aceita){
                resultadoObtido = 1;
            }
            return `${entrada[0]};${resultadoEsperado};${resultadoObtido};${tempo.toFixed(3)}`;
        });
        
        const saida = resultados.join('\n');

            fs.writeFile('arquivo_de_saida.out', saida);

}
main();