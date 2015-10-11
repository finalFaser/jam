var ProjectilePool = require('../common/ProjectilePool');
var Explosion = require('../common/Explosion');
var Beam = require('../common/Beam');

// Define constants
var LAZER_DELAY = 2500; //ms (0.5/sec)

module.exports = {
    create: function(){
        this.lastLazerShotAt = 0;

        this.explosion = new Explosion(this.game, 0, 0);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.bulletCollisionGroup = game.physics.p2.createCollisionGroup();
        this.beamCollisionGroup = game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.bulletPool = new ProjectilePool(this.game, this.bulletCollisionGroup, [this.bulletCollisionGroup, this.beamCollisionGroup]);
        this.bulletPool2 = new ProjectilePool(this.game, this.bulletCollisionGroup, [this.bulletCollisionGroup, this.beamCollisionGroup]);

        this.beam = this.add.existing(new Beam(this.game, this.beamCollisionGroup));
        this.beam.body.collides(this.bulletCollisionGroup, function(obj1, obj2){
            // Create an explosion
            this.explosion.boom(obj2.x, obj2.y);

            // Kill the bullet
            //obj2.kill();
        }, this);





        this._barbarian = this.add.sprite(300, 300, 'barbarian');
        this._barbarian.anchor.set(0.5, 0.5);

        this._barbarian.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this._barbarian.animations.add('run', [11, 12, 13, 14, 15, 16, 17, 18]);
        this._barbarian.animations.add('attack', [19, 20, 21]);

        this.game.physics.arcade.enable(this._barbarian);

        this._cursors = this.game.input.keyboard.createCursorKeys();
        this._shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        this._isAttacking = 0;
    },
    update: function(){

        // Shoot a bullet
        if (this.game.input.activePointer.isDown) {
            if (!this._isAttacking) {
                //others have magic mike
                //we have magic numbers
                this._isAttacking = 15;
            }
        }
        // Check if bullets have collided
 /*       this.game.physics.arcade.collide(this.bulletPool.bulletPool, this.bulletPool2.bulletPool, function(bullet, bullet2) {
            // Create an explosion
            this.explosion.boom(bullet.x, bullet.y);

            // Kill the bullet
            bullet.kill();
            bullet2.kill();
        }, null, this);


        // Check if bullets have collided with beams
        this.game.physics.arcade.collide(this.bulletPool2.bulletPool, this.beam, function(beam, bullet) {
            // Create an explosion
            this.explosion.boom(bullet.x, bullet.y);

            // Kill the bullet
            bullet.kill();
        }, null, this);
*/


        this._barbarian.body.velocity.x = 0;
        this._barbarian.body.velocity.y = 0;

        if (this._isAttacking) {
            //others have magic mike
            //we have magic numbers
            this._barbarian.animations.play('attack', 10);
        } else if (this._cursors.left.isDown || this._cursors.right.isDown || this._cursors.up.isDown || this._cursors.down.isDown) {
            this._barbarian.animations.play(this._shift.isDown ? 'run' : 'walk', 30, true);
        } else {
            this._barbarian.animations.stop('walk');
            this._barbarian.animations.stop('run');
            this._barbarian.frame = 0;
        }

        if (this._isAttacking && this._isAttacking--) {
            //others have magic mike
            //we have magic numbers
            if (this._isAttacking === 8) {
                //this.bulletPool.shoot(this._barbarian.x + 60, this._barbarian.y - 15);
                this.bulletPool2.shoot(600, 600);
            }

            if (this.game.time.now - this.lastLazerShotAt > LAZER_DELAY) {
                this.lastLazerShotAt = this.game.time.now;
                this.beam.shoot(this._barbarian.x, this._barbarian.y);
            }
        }

        var speedModifier = this._shift.isDown ? 2 : 1;

        if (this._cursors.left.isDown) {
            this._barbarian.body.velocity.x = speedModifier * -200;
        } else if (this._cursors.right.isDown) {
            this._barbarian.body.velocity.x = speedModifier * 200;
        }

        if (this._cursors.up.isDown) {
            this._barbarian.body.velocity.y = speedModifier * -200;
        } else if (this._cursors.down.isDown) {
            this._barbarian.body.velocity.y = speedModifier * 200;
        }
    }
};