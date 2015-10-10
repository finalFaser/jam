/**
 * Created by jorge.graca on 10/10/2015.
 */
var Projectile = require('..\\common\\Projectile');

var NUMBER_OF_BULLETS = 50;

var ProjectilePool = function(game){
    this.bulletPool = game.add.group();
    this.iBullet = 0;
    for(var i = 0; i < NUMBER_OF_BULLETS; i++) {
        this.bulletPool.add(new Projectile(game, 0, 0));
    }
};

ProjectilePool.prototype.shoot = function(x,y) {
    this.bulletPool.children[this.iBullet++%NUMBER_OF_BULLETS].shootBullet(x,y);
};

module.exports = ProjectilePool;