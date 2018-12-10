new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        currentTurn: 0
    },
    methods: {
        startGame(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits monster for ${damage}`,
                id: this.currentTurn + 1
            });

            this.currentTurn++;
            if(this.checkWin()) {
                return;
            }

           this.monsterAttacks();
        }, //end attack method

        specialAttack() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: `Player uses special attack for ${damage}`,
                id: this.currentTurn + 1
            });
            this.currentTurn++;
            if(this.checkWin()) {
                return;
            }
            this.monsterAttacks();
         
        }, // end special attack method
        heal(){
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

                this.turns.unshift({
                isPlayer: true,
                text: `Player heals for 5`,
                id: this.currentTurn + 1
            });

            this.currentTurn++
            this.monsterAttacks();

        }, //end heal method

        giveUp(){
            if(confirm("You have given up. Play again?")) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
                this.monsterHealth = 0;
                this.playerHealth = 0;
            }

            this.turns.unshift({
                isPlayer: true,
                text: `Player has given up.`,
                id: this.currentTurn + 1
            });

        }, //end give up method

        monsterAttacks() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth-= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage}`,
                id: this.currentTurn + 1
            })
            this.currentTurn++;

        }, //end monster attacks
        
        calculateDamage(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }, //end calculate damage method

        checkWin(){
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