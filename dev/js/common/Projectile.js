/**
 * Created by jorge.graca on 10/10/2015.
 */

var Projectile = function(game){
    //var arcade = new Phaser.Arcade(game);

    Phaser.Group.call( this, game );

    this.coisa = this.create(300, 300, 'BalaPotassio');
    this.coisa.anchor.set(0.5,0.5);
};

Projectile.prototype = Object.create(Phaser.Group.prototype);

Projectile.prototype.update = function() {
    Phaser.Group.prototype.update.call(this);
    this.coisa.x += 1;
};

Projectile.prototype.constructor = Projectile;

module.exports = Projectile;