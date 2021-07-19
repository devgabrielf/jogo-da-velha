const hash = {

    gameover: false,
    tabela: null,
    preenchimento: ['','','','','','','','',''],

    inicializar: function(tabela) {
        this.tabela = tabela;
    },

    iniciar: function(){
        this.simbolos.jogador = 0;
        this.gameover = false;
        this.preenchimento = ['','','','','','','','',''];
        this.preencher();
    },

    simbolos: {
        jogador: 0,
        opcoes: ['X','O'],
        alternar_jogador: function(){
            this.jogador = ( this.jogador === 0 ? 1:0 );
        }
    },

    casos_de_vitoria: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ],

    checar_vitoria: function(simbolo){
        for(i in this.casos_de_vitoria){
            if(this.preenchimento[this.casos_de_vitoria[i][0]] == simbolo &&
               this.preenchimento[this.casos_de_vitoria[i][1]] == simbolo &&
               this.preenchimento[this.casos_de_vitoria[i][2]] == simbolo){
                   return i;
               }
        }
        return -1;
    },

    jogar: function(i) {
        if (this.gameover) return false;
        if (this.preenchimento[i] === ''){
            this.preenchimento[i] = this.simbolos.opcoes[this.simbolos.jogador];
            this.preencher();
            let sequencia_vitoriosa = this.checar_vitoria(this.simbolos.opcoes[this.simbolos.jogador]);
            if(sequencia_vitoriosa >= 0){
                this.fim_de_jogo();
                this.destacar_vitoria(this.casos_de_vitoria[sequencia_vitoriosa]);
            }
            else{
                this.simbolos.alternar_jogador();    
            }
            return true;
        }
        else{
            return false;
        }
    },

    fim_de_jogo: function(){
        this.gameover = true;
    },

    destacar_vitoria: function(sequencia_vitoriosa){
        for(i in sequencia_vitoriosa){
            this.tabela.querySelector(`div:nth-child(${sequencia_vitoriosa[i]+1})`).classList.add('vencedora');
        }
        for(i in this.preenchimento){
            this.tabela.querySelector(`div:nth-child(${Number(i)+1})`).classList.remove('hover');
        }
    },

    preencher: function(){
        let preenchimentoHTML = '';

        for(i in this.preenchimento){
            preenchimentoHTML += '<div class="hover" onclick="hash.jogar('+i+')">'+this.preenchimento[i]+'</div>';
        }

        this.tabela.innerHTML = preenchimentoHTML;
    }
}
