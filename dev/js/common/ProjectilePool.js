/**
 * Created by jorge.graca on 10/10/2015.
 */
var Projectile = require('..\\common\\Projectile');

var NUMBER_OF_BULLETS = 50;

var ProjectilePool = function(game, bulletCollisionGroup, collisionArr){
    this.bulletPool = game.add.group();
    this.iBullet = 0;

    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.P2JS;

    for(var i = 0; i < NUMBER_OF_BULLETS; i++) {
        var tempP = new Projectile(game, 0, 0);

        tempP.body.setCollisionGroup(bulletCollisionGroup);
        tempP.body.collides(collisionArr);
        this.bulletPool.add(tempP);
    }
};

ProjectilePool.prototype.shoot = function(x,y) {
    this.bulletPool.children[this.iBullet++%NUMBER_OF_BULLETS].shootBullet(x,y);
};

module.exports = ProjectilePool;