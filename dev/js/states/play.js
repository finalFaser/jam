var ProjectilePool = require('..\\common\\ProjectilePool');
var Explosion = require('..\\common\\Explosion');

// Define constants
var SHOT_DELAY = 100; // milliseconds (10 bullets/second)


module.exports = {
    create: function(){
        this.lastBulletShotAt = 0;
        this.bulletPool = new ProjectilePool(this.game);
        this.bulletPool2 = new ProjectilePool(this.game);
        this.explosion = new Explosion(this.game, 0, 0);

        this._barbarian = this.add.sprite(300, 300, 'barbarian');
        this._barbarian.anchor.set(0.5, 0.5);

        this._barbarian.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this._barbarian.animations.add('run', [11, 12, 13, 14, 15, 16, 17, 18]);
        this._barbarian.animations.add('jump', [29, 30, 31, 32]);

        this.game.physics.arcade.enable(this._barbarian);

        this._cursors = this.game.input.keyboard.createCursorKeys();
        this._shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    },
    update: function(){
        // Shoot a bullet
        if (this.game.input.activePointer.isDown) {
            // Enforce a short delay between shots by recording
            // the time that each bullet is shot and testing if
            // the amount of time since the last shot is more than
            // the required delay.
            if (this.game.time.now - this.lastBulletShotAt < SHOT_DELAY) return;
            this.lastBulletShotAt = this.game.time.now;

            this.bulletPool.shoot(0,0);
            this.bulletPool2.shoot(600,600);
        }
        // Check if bullets have collided with the ground
        this.game.physics.arcade.collide(this.bulletPool.bulletPool, this.bulletPool2.bulletPool, function(bullet, bullet2) {
            // Create an explosion
            //this.getExplosion(bullet.x, bullet.y);

            this.explosion.boom(bullet.x, bullet.y);

            // Kill the bullet
            bullet.kill();
            bullet2.kill();
        }, null, this);

        this._barbarian.body.velocity.x = 0;
        this._barbarian.body.velocity.y = 0;

        if (this._cursors.left.isDown || this._cursors.right.isDown || this._cursors.up.isDown || this._cursors.down.isDown) {
            this._barbarian.animations.play(this._shift.isDown ? 'run' : 'walk', 30, true);
        } else {
            this._barbarian.animations.stop('walk');
            this._barbarian.animations.stop('run');
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