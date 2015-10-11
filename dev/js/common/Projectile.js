/**
 * Created by jorge.graca on 10/10/2015.
 */

var BULLET_SPEED = 500; // pixels/second

var Projectile = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'BalaPotassio');

    this.game.physics.p2.enable(this, true);
    this.body.setCircle(this.width/2);
    this.body.fixedRotation = true;


    this.anchor.set(0.5, 0.5);
    this.kill();
}

Projectile.prototype = Object.create(Phaser.Sprite.prototype);

//Projectile.prototype.update = function() {
//    Phaser.Sprite.prototype.update.call(this);
//};

Projectile.prototype.shootBullet = function(x,y) {
    // Revive the bullet
    // This makes the bullet "alive"
    this.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    this.body.collideWorldBounds = false;//p2
    this.checkWorldBounds = true;//arcade
    this.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    this.reset(x, y);

    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.rotation = this.game.physics.arcade.angleToPointer(this);

    // Shoot it
    this.body.velocity.x = Math.cos(this.rotation) * BULLET_SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * BULLET_SPEED;
};

Projectile.prototype.constructor = Projectile;

module.exports = Projectile;