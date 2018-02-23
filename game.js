// Create our game
var game = new Phaser.Game(1500, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
});

var map;
var backgroundLayer;
var groundLayer;
var player;
var myScore;
var score
var coins;
var coin;



// First, load anything we need for our game
function preload() {
    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grassMid', 'assets/grassMid.png');
    game.load.image('grassCenter', 'assets/grassCenter.png');
    game.load.image('player', 'assets/shuttle2.png');
    game.load.image('coin', 'assets/coin.png');
    
   // game.load.audiosprite('boden', ['bitmusic.mp3', 'phasermaster/examples/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg'], null, audioJSON);
    
    game.load.audio('back', 'bitmusic.mp3');
    
    
    game.load.image('starfield', 'phasermaster/examples/assets/misc/starfield.jpg');
}

function launch() {

    if (game.input.x < player.x)
    {
        player.body.velocity.setTo(-200, -200);
    }
    else
    {
        player.body.velocity.setTo(200, -200);
    }

}

var back;

// Set up the scene
function create() {
    
    //game.stage.backgroundColor = '#000080';
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    
    //add tilemap to game
    map = game.add.tilemap('level1');
    
    s = game.add.tileSprite(0, 0, 80000, 60000, 'starfield');
    
    //associate the image from tiled with the one we loaded from phaser
    map.addTilesetImage('dirttop', 'grassMid');
    map.addTilesetImage('dirt', 'grassCenter');
    
    
        music = game.add.audio('back');

    music.play();
    
    
    
    //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    backgroundLayer = map.createLayer('BackgroundLayer')
     groundLayer = map.createLayer('GroundLayer')
     
     
     map.setCollisionBetween(1, 1000, true, 'GroundLayer');
    
    groundLayer.resizeWorld();
    
    //Add player to game
    
    player = game.add.sprite(300, 400, 'player');
    
    coins = game.add.physicsGroup()
    for (var i = 0; i < 1250; i++) {
        x = Math.random()*35000;
        y = Math.random()*1050;
        
    //coin = game.add.physicsGroup();
        coin = game.add.sprite(x, y, 'coin');
        coins.add(coin);
    }
    
    
    game.physics.arcade.enable(player);
    
    //setup player physics properties
    //player.body.gravity.x = 20;
    player.body.gravity.y = 50;
    player.body.bounce.y = 0.75;
    //player.body.collideWorldBounds = true;
    player.body.bounce.set(0.8);
    
        //  Set the world (global) gravity
    //game.physics.arcade.gravity.y = 100;


    //game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.velocity.x = 200;
    
    player.body.bounce.set(0.99);

    player.body.gravity.set(0, 180);
    
    player.body.drag.set(5);
    player.body.maxVelocity.set(350);


    
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
    game.add.text(320, 800, 'Bounce as far as you can!', { font: '120px Arial', fill: '#ffffff' });
    
    
    
    player.anchor.set(1);
    

    
    //creating group for coins
    //coins = game.add.group();
    //coins.enableBody = true;
    
    //map.createFromObjects('coins', 3, 'coin', null, true, false, coins);
    score = 0;
    myScore = game.add.text(30,30,"Score:" + score, {fontSize: '20px', fill: '#ffffff'});
    
    player.addChild(myScore);
    
}

    

// Every frame (60 times a second) update the game - main logic loop


function update() {
    
  //     game.physics.arcade.overlap(player, coin, getcoin);
//        game.physics.arcade.collide(player, coin);
    
    //myScore = game.add.text(myScore, { fontSize: '25px', fill: '#ffffff' });
    //myScore.addChild(30, 30);
    
    
    game.physics.arcade.collide(player, groundLayer);
    
    
    game.physics.arcade.overlap(player, coins, getcoin);
    //game.physics.arcade.collide(coins, groundLayer);
    
    player.rotation = player.body.angle;
    
    //myScore.text="SCORE: " + game.camera.frameNo;
    //myScore.update();
    game.camera.follow(player, myScore);
    
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation);
    }
    else
    {
        player.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -50;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 50;
    }
    else
    {
        player.body.angularVelocity = 0;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
        game.physics.arcade.accelerationFromRotation(player.rotation, 450, player.body.acceleration);
    }
        else
    {
        player.body.acceleration.set(0);
    }

//    if (Phaser.Keyboard.SPACEBAR.isDown)
//    {
//        game.load.image('player', 'assets/shuttle3.png');
//        player.body.angularVelocity = -300;
//    }
//    else if (Phaser.Keyboard.SPACEBAR.isDown)
//    {
//        player.body.angularVelocity = 300;
//        game.load.image('player', 'assets/shuttle3.png');
//    }
//    else
//    {
//        player.body.angularVelocity = 0;
//        game.load.image('player', 'assets/shuttle3.png');
//    }
    
   // player.angle += 0.4;
}

function getcoin(player, coin) {
    
    coin.kill();
    score += 1;
    console.log('Ran');
    myScore.text="SCORE: " + score;

    //  Add and update the score
//    myScore += 10;
//    myScore.innerHTML = 'Score: ' + myScore;
//    console.log(myScore);
}


//game.physics.arcade.overlap(player,coin,collectReward);




