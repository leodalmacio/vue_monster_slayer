new Vue ({

  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    IsGameRunning: false,
    turns: [],
  },

  methods: {
    startGame: function() {
      this.IsGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    }, 

    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.turns.unshift(this.logger(true, 'Attack', damage));
      if(this.checkGameStatus()) {
        return;
      }

      var damage = this.monsterAttacks();
      this.turns.unshift(this.logger(false, 'Attack', damage));
      this.checkGameStatus();
    },

    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.turns.unshift(this.logger(true, 'Special Attack', damage));
      if(this.checkGameStatus()) {
        return;
      }

      var damage = this.monsterAttacks();
      this.turns.unshift(this.logger(false, 'Attack', damage));
      this.checkGameStatus();
    },

    heal: function () {
      if(this.playerHealth <= 90) {
        this.playerHealth = 100;
      }
      else {
        this.playerHealth += 10;
      }
      this.turns.unshift(this.logger(true, 'Heal', 10));

      var damage = this.monsterAttacks();
      this.turns.unshift(this.logger(false, 'Attack', damage));
      this.checkGameStatus(); 
    },

    giveUp: function () {
      this.IsGameRunning = false;
    },

    calculateDamage: function (min, max) {
      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.monsterHealth -= damage;
      return damage;
    },

    monsterAttacks: function () {
      var damage = Math.max(Math.floor(Math.random() * 12), 5);
      this.playerHealth -= damage;
      return damage;
    },

    checkGameStatus: function () {
      if (this.playerHealth <= 0) {
        alert('Monster won...');
        this.IsGameRunning = false;
        return true;
      }
      else if (this.monsterHealth <= 0) {
        alert('You Won!');
        this.IsGameRunning = false;
        return true;
      }
    },

    logger: function (isPlayer, action, value) {
      var log;
      if (isPlayer) {
        if (action === 'Attack' || action === 'Special Attack'){
          log = {
            isPlayer: true,
            text: 'Player used ' + action + ' on Monster and dealt ' + value 
          }
        }
        else if (action === 'Heal') {
          log = {
            isPlayer: true,
            text: 'Player uses heal and recovered ' + value
          }
        }
      }
      else {
        log = {
          isPlayer: false,
          text: 'Monster used ' + action + ' on Player and dealt ' + value
        }
      }
      return log;
    },

  }

});