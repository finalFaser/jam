/**
 * Created by jorge.graca on 10/10/2015.
 */

// Define constants
var SHOT_DELAY = 100; // milliseconds (10 bullets/second)
var BULLET_SPEED = 500; // pixels/second
var NUMBER_OF_BULLETS = 1;

var Projectile = function(game){
    Phaser.Group.call( this, game );

    this.bullet = this.create(300, 300, 'BalaPotassio');
    this.game.physics.enable(this.bullet, Phaser.Physics.ARCADE);
    this.bullet.anchor.set(0.5,0.5);
};

Projectile.prototype = Object.create(Phaser.Group.prototype);

Projectile.prototype.update = function() {
    Phaser.Group.prototype.update.call(this);

    // Shoot a bullet
    if (this.game.input.activePointer.isDown) {
        this.shootBullet();
    }
};

Projectile.prototype.shootBullet = function(rotation) {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    //var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    //if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    //bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    this.bullet.checkWorldBounds = true;
    this.bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    //bullet.reset(this.gun.x, this.gun.y);

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