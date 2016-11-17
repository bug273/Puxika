// initialize phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
      // this function will be executed at the beginning
      // that's where we load the images and sound
      game.load.image('bird', 'assets/bird.png');
      game.load.image('pipe', 'assets/pipe.png');
      game.load.audio('jump', 'assets/jump.wav');
    },
    
    create: function() {
        this.jumpSound = game.add.audio('jump');
        // this function is called after the preload function
        // here we set up the game, display sprites, etc
        // change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';
        
        // set th physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // create a new group 
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird' );
        
        // add physics to the bird
        game.physics.arcade.enable(this.bird);
        
        // add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;
        
        // call the 'jump' function
        var spaceKey = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill:"#fff"});
        
        //Move the anchor to the left and downward
        this.bird.anchor.setTo(-0.2, 0.5);
    },
    
    update: function() {
        // this function is called 60 times per second
        // it contains the game's logic
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
        
        game.physics.arcade.overlap(
          this.bird, this.pipes, this.hitPipe, null, this);
        
        if(this.bird.angle < 20)
            this.bird.angle += 1;
    },
    
    hitPipe: function() {
        // if bird has already hit a pipe, do nothing
        // it means the bird is already falling off the screen
            if (this.bird.alive == false)
                return;
            
        // set the alive property of the bird to false
            this.bird.alive = false;
            
        // prevent new pipes from appearing
            game.time.events.remove(this.timer);
            
        // go through all the pipes, and stop their movement
            this.pipes.forEach(function(p){
                p.body.velocity.x = 0;
            }, this);
        },
    
    // make the bird jump
    jump: function() {
        if(this.bird.alive == false)
            return;
        this.jumpSound.play();
        //add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        
        //create an animation on the bird
        var animation = game.add.tween(this.bird);
        
        //change the angle of the bird to -20º in 100 ms
        animation.to({angle: -20}, 100);
        
        // start the animation
        animation.start();
    },
    
    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restart the game
        game.state.start('main');
    },   
   addOnePipe: function(x, y) {
        // create a pipe at the position x and y
      var pipe = game.add.sprite(x,y, 'pipe');
            
    // add the pipe to our previously created group
      this.pipes.add(pipe);
            
            // enable physics on the pipe
      game.physics.arcade.enable(pipe);
            
            // add velocity to the pipe to make it move left
            pipe.body.velocity.x = -200;
            
            // automatically kill the pipe when it's no longer viewed
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
   },
    
    addRowOfPipes: function() {
        // randomly pick a number between 1 and 5
        var hole = Math.floor(Math.random() * 5) + 1;
            
        // add the 6 pipes
        for (var i = 0; i < 8; i++)
          if (i != hole && i != hole + 1)
              this.addOnePipe(400, i * 60 + 10);
          this.score += 1;
          this.labelScore.text = this.score;
      },
};

// add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');

