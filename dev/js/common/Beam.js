/**
 * Created by jorge.graca on 10/10/2015.
 */

var MAX_LENGTH = 850; // pixels
var TOTAL = 2000; //ms
var FADE_TIME = 600; //ms
var BEAM_SPEED_START = 100;
var FIRE_TIME = 100;//ms

var Beam = function(game, x, y) {
    Phaser.Sprite.call(this, game, x?x:200, y?y:200, 'beam');

    this.alphaTween = this.game.add.tween(this).to({alpha: 0}, FADE_TIME, null, false, TOTAL - FADE_TIME);
    this.alphaTween.onComplete.add(function(){
        this.kill();
    }, this);
    this.sizeTween = this.game.add.tween(this.scale).to({x: MAX_LENGTH}, TOTAL - FADE_TIME);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.velocityTween = this.game.add.tween(this.body.velocity).to({
        x : 0,// Math.cos(this.rotation) * BEAM_SPEED_END,
        y : 0 //Math.sin(this.rotation) * BEAM_SPEED_END
    }, TOTAL-FIRE_TIME,  null, false, 0);



    //this.velocityTween.onStart.add(alterVelocity, this);
    //this.velocityTween.onLoop.add(alterVelocity, this);

    this.anchor.set(0, 0.5);
    this.kill();

    this.scale.setTo(0, 1);
}

Beam.prototype = Object.create(Phaser.Sprite.prototype);



Beam.prototype.shoot = function(x,y) {
    // Revive the bullet
    // This makes the bullet "alive"
    this.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    //this.checkWorldBounds = true;
    //this.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    this.reset(x, y);
    this.alpha = 1;
    this.scale.setTo(0, 1);

    this.sizeTween.start();
    this.alphaTween.start();

    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.rotation = this.game.physics.arcade.angleToPointer(this);
    var that = this;
    //setTimeout( , FIRE_TIME);

    game.time.events.add(Phaser.Timer.QUARTER, function(){
        that.body.velocity.x = Math.cos(this.rotation) * BEAM_SPEED_START;
        that.body.velocity.y = Math.sin(this.rotation) * BEAM_SPEED_START;
        that.velocityTween.start();
    }, this).autoDestroy = true;


};

Beam.prototype.constructor = Beam;

module.exports = Beam;