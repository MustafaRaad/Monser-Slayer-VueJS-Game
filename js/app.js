new Vue({
    el: "#app",
    data: {
        isRunning: false,
        monsterHealth: 100,
        playerHealth: 100,
        turns: [],
    },
    methods: {
        startGame() {
            this.isRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns=[];
        },
        attack() {
            this.monsterAttack(10, 3);
            this.playerAttack(12, 5);
        },
        specialAttack() {
            this.monsterAttack(20, 16);
            this.playerAttack(18, 15);
        },
        monsterAttack(max, min) {
            let damage = this.calculateDamage(max, min);
            this.monsterHealth -= damage;
            this.log(false,damage,'Monster')
            if (this.checkWin()) {
                return;
            }
        },
        playerAttack(max, min) {
            let damage = this.calculateDamage(max, min);
            this.playerHealth -= damage;
            this.log(true, damage, 'Player')
            if(this.checkWin()){
                return;
            };
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            }

        },
        giveUp() {
            this.isRunning = false;
        },
        calculateDamage(max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm("You won! New game ?")) {
                    this.startGame();
                } else {
                    this.isRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! New game ?")) {
                    this.startGame();
                } else {
                    this.isRunning = false;
                }
                return true;
            }
            return false;
        },
        log(isPlayer=boolean,damage,by) {
            this.turns.unshift({
                isPlayer,
                text:`${by} hits =>`+ damage,
            });
        }
    },
    computed: {},
    watch: {}
});