// crea nuestro main state que contendrá el juego
var mainState= {
	preload: function(){
		// Esta función se ejecutará al inicio
		// Aqui es donde se cargan las imagenes y el sonido
		game.load.image('bird', 'assets/bird.png');
	},
	
	create: function(){
		// Esta función es llamada despues de la funcion 'preload'
		// aquí configuramos el juego, las pantallas, etc
		game.stage.backgroundColor = '#71c5cf';
		
		// Configura la fisica del juego
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Muestra el pajaro en la posición x=100 y=245
		this.bird = game.add.sprite(100,245, 'bird');
		
		// Añade la fisica al pajaro
		this.bird.body.gravity.y = 1000;
		
		// Llama la funcion de 'salto' cuando se pulsa la barra de espacio
		var spaceKey = game.input.keyboard.addKey(
		  Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);
		},
		
	update: function(){
		// Esta funcion es llamada 60 veces por segundo
		// contiene la logica del juego
		if (this.bird.y <0 || this.bird.y > 490)
		this.restartGame();
		},
		
		// Hacer que el pinche pajaro salte
jump: function(){
  // añade velocidad vertical al pajarraco
	this.bird.body.velocity.y = -350;
	},
	
	restartGame: function() {
		// Inicia el estado 'main', el cual reinicia el juego
		game.state.start('main');
	}
	};
// Inicializa Phaser, y crea un juego de 400x490px
var game = new Phaser.Game(400, 490);

// Añade el 'mainState' y le llama 'main'
game.state.add('main', mainState);

		


// Inicia el estado que actualmente inicia el juego
game.state.start('main');
