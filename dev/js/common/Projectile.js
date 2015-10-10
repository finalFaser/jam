/**
 * Created by jorge.graca on 10/10/2015.
 */


var BULLET_SPEED = 500; // pixels/second

var Projectile = function(game, x, y){
    Phaser.Group.call( this, game );

    this.bullet = this.create(x, y, 'BalaPotassio');//create a Sprite and add it to this(Group)
    this.game.physics.enable(this.bullet, Phaser.Physics.ARCADE);
    this.bullet.anchor.set(0.5,0.5);

    this.bullet.kill();
};

Projectile.prototype = Object.create(Phaser.Group.prototype);

Projectile.prototype.update = function() {
    Phaser.Group.prototype.update.call(this);
};

Projectile.prototype.shootBullet = function(x,y) {


    // Get a dead bullet from the pool
    //var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    //if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    this.bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    this.bullet.checkWorldBounds = true;
    this.bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    this.bullet.reset(x, y);

    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.bullet.rotation = this.game.physics.arcade.angleToPointer(this.bullet);

    // Shoot it
    this.bullet.body.velocity.x = Math.cos(this.bullet.rotation) * BULLET_SPEED;
    this.bullet.body.velocity.y = Math.sin(this.bullet.rotation) * BULLET_SPEED;
};

Projectile.prototype.constructor = Projectile;

module.exports = Projectile;