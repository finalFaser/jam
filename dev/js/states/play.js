var ProjectilePool = require('..\\common\\ProjectilePool');

// Define constants
var SHOT_DELAY = 100; // milliseconds (10 bullets/second)


module.exports = {
    create: function(){
        this.lastBulletShotAt = 0;
        this.bulletPool = new ProjectilePool(this.game);

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
        }
    }
};