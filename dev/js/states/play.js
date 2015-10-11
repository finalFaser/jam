var ProjectilePool = require('../common/ProjectilePool');
var Explosion = require('../common/Explosion');
var Beam = require('../common/Beam');

// Define constants
var LAZER_DELAY = 2500; //ms (0.5/sec)

module.exports = {
    create: function(){

        this.background = this.add.sprite(0, 0, 'background');
        this.themeSound = this.game.add.audio('themeSound', 0.05, true).play();



        this._scientist2 = this.add.sprite(500, 500, 'scientist2');
        this._scientist2.scale= {x:2, y:2};
        this._scientist2.anchor.set(0.5, 0.5);

        this._scientist2.animations.add('walk', [1, 2]);
        this._scientist2.animations.add('run', [11, 12, 13, 14]);
        this._scientist2.animations.add('attack', [19, 20, 21, 30, 31, 32]);

        this.game.physics.arcade.enable(this._scientist2);


        this._scientist = this.add.sprite(300, 300, 'scientist');
        this._scientist.scale= {x:2, y:2};
        this._scientist.anchor.set(0.5, 0.5);

        this._scientist.animations.add('walk', [1, 2]);
        this._scientist.animations.add('run', [11, 12, 13, 14]);
        this._scientist.animations.add('attack', [19, 20, 21, 31, 32]);

        this.game.physics.arcade.enable(this._scientist);


        this._cursors = this.game.input.keyboard.createCursorKeys();
        this._shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        this._isAttacking = 0;

        this.lastLazerShotAt = 0;

        this.explosion = new Explosion(this.game, 0, 0);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.bulletCollisionGroup = game.physics.p2.createCollisionGroup();
        this.beamCollisionGroup = game.physics.p2.createCollisionGroup();
        //this.game.physics.p2.updateBoundsCollisionGroup();
        this.bulletPool = new ProjectilePool(this.game, this.bulletCollisionGroup, [this.bulletCollisionGroup, this.beamCollisionGroup]);
        this.bulletPool2 = new ProjectilePool(this.game, this.bulletCollisionGroup, [this.bulletCollisionGroup, this.beamCollisionGroup]);

        this.beam = this.add.existing(new Beam(this.game, this.beamCollisionGroup, this.bulletCollisionGroup));
        this.beam.body.collides(this.bulletCollisionGroup, function(obj1, obj2){
            // Create an explosion
            this.explosion.boom(obj2.x, obj2.y);

            // Kill the bullet
            obj2.sprite.kill();
        }, this);

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
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

        this._scientist.body.velocity.x = 0;
        this._scientist.body.velocity.y = 0;
        this._scientist2.body.velocity.x = 0;
        this._scientist2.body.velocity.y = 0;

        if (this._isAttacking) {
            //others have magic mike
            //we have magic numbers
            if (this.game.time.now - this.lastLazerShotAt > LAZER_DELAY) {
                this._scientist.animations.play('attack', 10);
            }
        } else if (this._cursors.left.isDown || this._cursors.right.isDown || this._cursors.up.isDown || this._cursors.down.isDown) {
            this._scientist.animations.play(this._shift.isDown ? 'run' : 'walk', 30, true);
        } else {
            this._scientist.animations.stop('walk');
            this._scientist.animations.stop('run');
            this._scientist.frame = 0;
        }

        if (this._isAttacking && this._isAttacking--) {
            //others have magic mike
            //we have magic numbers
            if (this._isAttacking === 8) {
                //this.bulletPool.shoot(this._scientist.x + 60, this._scientist.y - 15);
                this.bulletPool2.shoot(600, 600);
            }

            if (this.game.time.now - this.lastLazerShotAt > LAZER_DELAY) {
                this.lastLazerShotAt = this.game.time.now;

                //Move origin more towards the source
                var myPoint = new Phaser.Point();
                myPoint.x = this._scientist.x;
                myPoint.y = this._scientist.y;
                myPoint.subtract(game.input.position.x, game.input.position.y);
                myPoint.normalize();
                myPoint.setMagnitude(25);

                this.beam.shoot(this._scientist.x + myPoint.x, this._scientist.y + myPoint.y);
            }
        }

        var speedModifier = this._shift.isDown ? 2 : 1;

        if (this._cursors.left.isDown) {
            this._scientist.body.velocity.x = speedModifier * -200;
        } else if (this._cursors.right.isDown) {
            this._scientist.body.velocity.x = speedModifier * 200;
        }

        if (this._cursors.up.isDown) {
            this._scientist.body.velocity.y = speedModifier * -200;
        } else if (this._cursors.down.isDown) {
            this._scientist.body.velocity.y = speedModifier * 200;
        }


        if (this.wKey.isDown || this.aKey.isDown || this.sKey.isDown || this.dKey.isDown) {
            this._scientist2.animations.play(this._shift.isDown ? 'run' : 'walk', 30, true);
        } else {
            this._scientist2.animations.stop('walk');
            this._scientist2.animations.stop('run');
            this._scientist2.frame = 0;
        }

        if(this.aKey.isDown){
            this._scientist2.body.velocity.x = speedModifier * -200;
        } else if(this.dKey.isDown){
            this._scientist2.body.velocity.x = speedModifier * 200;
        }

        if(this.wKey.isDown){
            this._scientist2.body.velocity.y = speedModifier * -200;
        } else if(this.sKey.isDown){
            this._scientist2.body.velocity.y = speedModifier * 200;
        }
    }
};