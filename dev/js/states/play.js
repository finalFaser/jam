var Projectile = require('..\\common\\Projectile');

module.exports = {
    create: function(){
        //This is just like any other Phaser create function
        this.teste = new Projectile(this.game);

    },
    update: function(){
        //Game logic gpdate(;
    }
};