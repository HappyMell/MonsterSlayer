new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits monster for ${damage}`
            });

            if(this.checkWin()) {
                return;
            }

           this.monsterAttacks();
        }, //end attack method

        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: `Player uses special attack for ${damage}`
            });

            if(this.checkWin()) {
                return;
            }
            this.monsterAttacks();
         
        }, // end special attack method
        heal: function(){
            if (this.playerHealth <= 90) {
                this.playerHealth += 5;
            } else {
                this.playerHealth = 100;
            }


            this.playerHealth += 5;
            this.monsterAttacks();

            this.turns.unshift({
                isPlayer: true,
                text: `Player heals for 5`
            });

        }, //end heal method

        giveUp: function(){
            if(confirm("You have given up. Play again?")) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
                this.monsterHealth = 0;
                this.playerHealth = 0;
            }

            this.turns.unshift({
                isPlayer: true,
                text: `Player has given up.`
            });

        }, //end give up method

        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth-= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage}`
            })

        }, //end monster attacks
        
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }, //end calculate damage method

        checkWin: function(){
            if(this.monsterHealth <= 0) {

                if(confirm("You won! Play again?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true

            } else if(this.playerHealth <= 0) {

                if(confirm("You lost! Play again?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true
            }
            return false
        } // end check win method
    }

});