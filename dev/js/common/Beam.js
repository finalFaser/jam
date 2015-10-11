/**
 * Created by jorge.graca on 10/10/2015.
 */

var MAX_LENGTH = 850; // pixels
var TOTAL = 2000; //ms
var FADE_TIME = 600; //ms
var BEAM_SPEED_START = 100;
var FIRE_TIME = 100;//ms

var Beam = function(game, myCollisionGroup) {
    Phaser.Sprite.call(this, game, 0, 0, 'beam');

    this.game.physics.p2.enable(this, true);
    this.body.fixedRotation = true;
    this.myCollisionGroup = myCollisionGroup;
    this.body.setRectangleFromSprite(this);//(this.width, this.height);
    this.body.setCollisionGroup(myCollisionGroup);

    this.alphaTween = this.game.add.tween(this).to({alpha: 0}, FADE_TIME, null, false, TOTAL - FADE_TIME);
    this.alphaTween.onComplete.add(function(){
        this.kill();
    }, this);
    this.sizeTween = this.game.add.tween(this).to({width: MAX_LENGTH}, TOTAL - FADE_TIME);
    this.glowTween = this.game.add.tween(this.scale).to({y: 2}, 200, null, null, 50, -1, true);
    this.velocityTween = this.game.add.tween(this.body.velocity).to({
        x : 0,// Math.cos(this.rotation) * BEAM_SPEED_END,
        y : 0 //Math.sin(this.rotation) * BEAM_SPEED_END
    }, TOTAL-FIRE_TIME,  null, false, 0);

    this.anchor.set(0, 0.5);
    this.kill();

    this.scale.setTo(0, 1);
}

Beam.prototype = Object.create(Phaser.Sprite.prototype);

Beam.prototype.update = function() {
   Phaser.Sprite.prototype.update.call(this);

   this.body.setRectangleFromSprite(this);
   //this.body.setPosition(this.position);
   this.body.reset(this.x, this.y);
   this.body.setCollisionGroup(this.myCollisionGroup);

   //game.debug.bodyInfo(this, 32, 32);
   //game.debug.body(this);
};


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
    this.glowTween.start();
    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.rotation = this.game.physics.arcade.angleToPointer(this);
    this.body.rotation = this.rotation;

    game.time.events.add(Phaser.Timer.QUARTER, function(){
        this.body.velocity.x = Math.cos(this.rotation) * BEAM_SPEED_START;
        this.body.velocity.y = Math.sin(this.rotation) * BEAM_SPEED_START;
        this.velocityTween.start();
    }, this).autoDestroy = true;


};

Beam.prototype.constructor = Beam;

module.exports = Beam;