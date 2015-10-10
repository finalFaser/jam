/**
 * Created by jorge.graca on 10/10/2015.
 */

var Projectile = function(game){
    //var arcade = new Phaser.Arcade(game);

    Phaser.Group.call( this, game );

    this.coisa = this.create(300, 300, 'BalaPotassio');
    this.coisa.anchor.set(0.5,0.5);

    //player movement
    //this.coisa.body.velocity.y = 0;
    //this.coisa.body.velocity.x = 0;
};

Projectile.prototype = Object.create(Phaser.Group.prototype);

Projectile.prototype.update = function() {
    Phaser.Group.prototype.update.call(this);

/*    if(this.cursors.up.isDown) {
        this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
        this.player.body.velocity.y += 50;
    }
    if(this.cursors.left.isDown) {
        this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
        this.player.body.velocity.x += 50;
    }*/
};

Projectile.prototype.constructor = Projectile;

module.exports = Projectile;