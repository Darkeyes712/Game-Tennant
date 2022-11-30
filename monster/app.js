function getkValue(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const app = Vue.createApp({
    data() {
        return {
            playerName: "Default User",
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            victor: null,
            playerRoundsWon: 0,
            monsterRoundsWon: 0,
            logMessages: [],
            singleTurnValue: 0

        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.victor = 'draw';
            }
            else if (value <= 0) {
                this.victor = 'monster';
                this.monsterRoundsWon++;
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.victor = 'draw';
            }
            else if (value <= 0) {
                this.victor = 'player';
                this.playerRoundsWon++;
            }
        }
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                };
            }
            else {
                return {
                    width: this.monsterHealth + '%'
                };
            }
        },
        playerBarStyle() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                };
            }
            else {
                return {
                    width: this.playerHealth + '%'
                };
            }

        },
        disabledSpecialButton() {
            return (
                this.currentRound % 3 !== 0
            );
        },
        disabledHealButton() {
            return (
                this.currentRound % 2 !== 0
            );
        }


    },
    methods: {

        playerAttacksMonster() {
            this.currentRound++;
            var attackValue = getkValue(3, 11)
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue, this.singleTurnValue)
            this.monsterAttacksPlayer()
            this.singleTurnValue++;
        },
        monsterAttacksPlayer() {
            var attackValue = getkValue(4, 12)
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue, this.singleTurnValue)
            this.singleTurnValue++;
        },
        specialAttackMonster() {
            this.currentRound++;
            var attackValue = getkValue(10, 40)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'special-attack', attackValue, this.singleTurnValue)
            this.monsterAttacksPlayer()
            this.singleTurnValue++;
        },
        healPlayer() {
            var healthValue = getkValue(5, 15)
            this.currentRound++;
            if (this.playerHealth + healthValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healthValue
            }
            this.addLogMessage('player', 'heal', healthValue, this.singleTurnValue)
            this.monsterAttacksPlayer()
            this.singleTurnValue++;
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.victor = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        playerSurrenders() {
            this.victor = 'monster';
            this.monsterRoundsWon++;
        },
        addLogMessage(who, what, dmgValue, turn) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: dmgValue,
                actionTurn: turn
            });
        }
    }
});


app.mount("#game")