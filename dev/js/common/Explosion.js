/**
 * Created by jorge.graca on 10/10/2015.
 */

var BULLET_SPEED = 500; // pixels/second

var Explosion = function(game, x, y) {
    Phaser.Group.call(this, game);

    this.explosion = this.create(x, y, 'explosion');
    this.explosion.anchor.setTo(0.5, 0.5);
    this.explosion.kill();

    // Add an animation for the explosion that kills the sprite when the
    // animation is complete
    this.explosionAnim = this.explosion.animations.add('boom', [0, 1, 2, 3], 50, false);
    this.explosionAnim.killOnComplete = true;
}

Explosion.prototype = Object.create(Phaser.Group.prototype);

//Explosion.prototype.update = function() {
//    Phaser.Group.prototype.update.call(this);
//};

Explosion.prototype.boom = function(x,y) {
    this.explosion.x = x;
    this.explosion.y = y;

    this.explosion.revive();
    // Set rotation of the explosion at random for a little variety
    this.explosion.angle = this.game.rnd.integerInRange(0, 360);
    // Play the animation
    this.explosion.animations.play('boom');
};

Explosion.prototype.constructor = Explosion;

module.exports = Explosion;