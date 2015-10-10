/**
 * Created by mariomc on 10/10/2015.
 */


function createFrames( name, animationName, numberFrames ) {
    var frameArray = [];
    for( var i = 1; i <= numberFrames; i++ ) {
        var pad = "";
        if (i < 10){ pad = "00"; } else if ( i < 100 ) { pad = "0";}
        frameArray.push( name + '_' + animationName + '_' + pad + i );
    }
    console.warn(frameArray);
    return frameArray;
};

var Character = function( game, x, y, name, animations ){
    //var arcade = new Phaser.Arcade(game);

    Phaser.Sprite.call( this, game, x, y, 'characters', name);

    this.anchor.set(.5,.5);

    animations = animations || {};

    for( var frame in animations ){
        if(animations.hasOwnProperty(frame)){
            var numberFrames = animations[frame];
            this.animations.add( frame, createFrames( name, frame, numberFrames ) )
        }
    }
};
Character.prototype = Object.create(Phaser.Sprite.prototype);

Character.prototype.constructor = Character;


module.exports = Character;