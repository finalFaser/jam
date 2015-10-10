var Projectile = require('..\\common\\Projectile');

// Define constants
var SHOT_DELAY = 100; // milliseconds (10 bullets/second)
var NUMBER_OF_BULLETS = 100;


var iBullet = 0;

module.exports = {
    create: function(){
        this.lastBulletShotAt = 0;
        this.bulletPool = this.game.add.group();
        for(var i = 0; i < NUMBER_OF_BULLETS; i++) {
            this.bulletPool.add(new Projectile(this.game, 0, 0));
        }

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

            this.bulletPool.children[iBullet++%NUMBER_OF_BULLETS].shootBullet(0,0);
        }
    }
};