jQuery(document).ready(function($){
Crafty.init(1000, 500);
Crafty.background('rgb(127,127,127)');
MAX_HEIGHT = 200;
naturalDir = 1;
tranny_color1 = 'rgb(255,0,255)';
tranny_color2 = 'rgb(255,0,255)';
tranny_color3 = 'rgb(255,0,255)';
tranny_color4 = 'rgb(255,0,255)';
point1 = false;
point2 = false;
point3 = false;
point4 = false;
enemies = [];
playerSpeed = 10;
playerJump = 8;

  // The loading screen that will display while our assets load
  Crafty.scene("loading", function() {
  console.log('loading');
    // Load takes an array of assets and a callback when complete
    Crafty.load(["player.jpg"], function() {
      Crafty.scene("title"); //when everything is loaded, run the main scene
    });
    
    // Black background with some loading text
    Crafty.background('rgb(127,127,127)');
    Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
      .text("Loading")
      .css({"text-align": "center"});
  });
  
  Crafty.scene("dead", function() {
  	  Crafty.viewport.x = 0;
  	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("You have died. Press SPACE to Try Again.")
	      .css({"text-align": "center", "font-family":"VT323", "font-size":"24px", "color":"#000"})
	      .bind('KeyDown', function(e) {
		      if(e.key == Crafty.keys['SPACE']) {
			      Crafty.scene("main");
			  }
		  });
	  console.log('dead');
  });
  
  Crafty.scene("won", function() {
	  Crafty.viewport.x = 0;
	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("You have won.")
	      .css({"text-align": "center", "font-family":"VT323", "font-size":"24px", "color":"#000"})
	  console.log('won');
  });
  
  Crafty.scene("title", function() {
  	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("Game Title")
	      .css({"text-align": "center", "color":"#000", "font-family":"VT323"});
	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 420})
	      .text("PRESS SPACE TO CONTINUE")
	      .css({"text-align": "center", "color":"#000", "font-family":"VT323", "font-size":"36px"})
	      .bind('KeyDown', function(e) {
		      if(e.key == Crafty.keys['SPACE']) {
			      Crafty.scene("main");
			  }
		  });
	  console.log('title');
  });
  
  Crafty.scene("main", function() {
	Crafty.background('rgb(127,127,127)');
    function createPlatform(rgb, x, y, w, h){
	if(!rgb){
		rgb = 'rgb(0,0,0)';
	}
	if(!h){
		h = w;
	}
	if(!x){
		x = 0;
	}
	if(!y){
		y = 0;
	}
	if(!w){
		w = 100;
	}
	var p = Crafty.e("platform, 2D, DOM, Color, Collision")
    .color(rgb)
    .attr({ x: x, y: y, w: w, h: h })
    .collision();
    return p;
}

function createEnemy(dir, dist, rgb, x, y, w, h){
	var origx = x;
	var origy = y;
	left = false;
	right = false;
	up = false;
	down = false;

	if(!dir){
		dir = 'lr';
	}

	if(!dist){
		dist = 40;
	}
	if(!rgb){
		rgb = 'rgb(0,0,0)';
	}
	if(!h){
		h = w;
	}
	if(!x){
		x = 0;
	}
	if(!y){
		y = 0;
	}
	if(!w){
		w = 100;
	}
	var enemy = Crafty.e("enemy, 2D, DOM, Color, Tween, Collision")
    .color(rgb)
    .attr({ x: x, y: y, w: w, h: h, origx: x, origy: y })
    .collision()
    .bind('EnterFrame', function () {
    	if(point1 && point2 && point3 && point4){
	    	Crafty.scene("won");
    	}
    	if(point1){
	    	// deres stage 1

    	}
    	if(point1 && point2){
	    	// deres stage 2
	    	
    	}
    	if(point1 && point2 && point3){
	    	// deres stage 3
	    	
    	}
/*
    	if(dir == 'lr'){
		    if(this.x >= origx+(dist/2) && right == true){
		    	right = false;
		    	left = true;
			    this.tween({x: origx-(dist/2), y: y}, 60)
		    } else if(this.x <= origx-(dist/2) && left == true){
		    	right = true;
		    	left = false;
			    this.tween({x: origx+(dist/2), y: y}, 60)
		    }
    	} else if (dir == 'ud'){
		    if(this.y >= origy+(dist/2) && down == true){
		    	down = false;
		    	up = true;
			    this.tween({x: x, y: origy-(dist/2)}, 60)
		    } else if(this.y <= origy-(dist/2) && up == true){
		    	down = true;
		    	up = false;
			    this.tween({x: x, y: origy+(dist/2)}, 60)
		    }
		}
*/
    })
    .bind('TweenEnd', function(){
	    if(dir == 'lr'){
		    if(this.x >= origx+(dist/2)){
			    this.tween({x: origx-(dist/2), y: y}, 60)
		    } else if(this.x <= origx-(dist/2)){
			    this.tween({x: origx+(dist/2), y: y}, 60)
		    }
    	} else if (dir == 'ud'){
		    if(this.y >= origy+(dist/2)){
			    this.tween({x: x, y: origy-(dist/2)}, 60)
		    } else if(this.y <= origy-(dist/2)){
			    this.tween({x: x, y: origy+(dist/2)}, 60)
		    }
		}
    });
    if(dir == 'lr'){
		right = true;
		enemy.tween({x: origx+(dist/2), y: y}, 30)
	}

	
	if(dir == 'ud'){
		down = true;
		enemy.tween({x: x, y: origy+(dist/2)}, 30)
	}
    return enemy;
}

var playerSprite = Crafty.sprite(60, 60, "player.jpg", {
    walkleft: [0, 0, 60, 60],
    wakright: [0, 1, 60, 60]
});

var ground = Crafty.e("platform, 2D, DOM, Collision, Color")
    .color('rgb(0,255,0)')
    .attr({ x: 0, y: 460, w: 11000, h: 40 })
    .collision()
    .onHit("Player", function(obj){
	    hit = true;
    });
 //-------------Platform---------------------//   
var platform1 = createPlatform('rgb(0,255,0)',500,300,150,20);
var platform2 = createPlatform('rgb(0,255,0)',850,170,150,20);
var platform3 = createPlatform('rgb(0,255,0)',1700,300,150,20);
var platform4 = createPlatform('rgb(0,255,0)',2015,170,150,20);
var platform5 = createPlatform('rgb(0,255,0)',2775,170,150,20);
var platform6 = createPlatform('rgb(0,255,0)',4115,300,150,120);
var platform7 = createPlatform('rgb(0,255,0)',4410,240,150,20);
var platform8 = createPlatform('rgb(0,255,0)',4975,300,100,20);
var platform9 = createPlatform('rgb(0,255,0)',5200,170,100,20);
var platform10 = createPlatform('rgb(0,255,0)',5550,240,100,20);
var platform11 = createPlatform('rgb(0,255,0)',6000,380,100,20);
var platform12 = createPlatform('rgb(0,255,0)',7575,380,100,20);
var platform13 = createPlatform('rgb(0,255,0)',7855,260,100,20);
var platform14 = createPlatform('rgb(0,255,0)',8020,220,100,20);
var platform15 = createPlatform('rgb(0,255,0)',8020,360,100,20);
var platform16 = createPlatform('rgb(0,255,0)',8175,300,40,20);
var platform17 = createPlatform('rgb(0,255,0)',10315,440,40,20);
var platform18 = createPlatform('rgb(0,255,0)',10355,410,40,20);
var platform19 = createPlatform('rgb(0,255,0)',10405,375,40,20);
var platform20 = createPlatform('rgb(0,255,0)',10455,350,40,20);
var platform21 = createPlatform('rgb(0,255,0)',10505,320,40,20);
var platform22 = createPlatform('rgb(0,255,0)',10555,290,40,20);
var platform23 = createPlatform('rgb(0,255,0)',10625,260,265,20);
//-------------Enemies---------------------//
var enemy1 = createEnemy('ud', 200, 'rgb(255,0,0)',1940,230,40,40);
var enemy2 = createEnemy('ud', 200, 'rgb(255,0,0)',2360,320,40,40);
var enemy3 = createEnemy('ud', 200, 'rgb(255,0,0)',2610,320,40,40);
var enemy4 = createEnemy('ud', 200, 'rgb(255,0,0)',3370,320,40,40);
var enemy5 = createEnemy('ud', 200, 'rgb(255,0,0)',3500,320,40,40);
var enemy6 = createEnemy('ud', 200, 'rgb(255,0,0)',3620,320,40,40);
var enemy7 = createEnemy('ud', 200, 'rgb(255,0,0)',4170,370,40,40);
var enemy8 = createEnemy('ud', 200, 'rgb(255,0,0)',4310,220,40,40);
var enemy9 = createEnemy('ud', 200, 'rgb(255,0,0)',4800,320,40,40);
var enemy10 = createEnemy('ud', 200, 'rgb(255,0,0)',5410,90,40,40);
var enemy11 = createEnemy('ud', 200, 'rgb(255,0,0)',6410,400,40,40);
var enemy12 = createEnemy('ud', 200, 'rgb(255,0,0)',6530,320,40,40);
var enemy13 = createEnemy('ud', 200, 'rgb(255,0,0)',6650,230,40,40);
var enemy14 = createEnemy('ud', 200, 'rgb(255,0,0)',6650,400,40,40);
var enemy15 = createEnemy('ud', 200, 'rgb(255,0,0)',6780,320,40,40);
var enemy16 = createEnemy('ud', 200, 'rgb(255,0,0)',6910,230,40,40);
var enemy17 = createEnemy('ud', 200, 'rgb(255,0,0)',6910,400,40,40);
var enemy18 = createEnemy('ud', 200, 'rgb(255,0,0)',7030,320,40,40);
var enemy19 = createEnemy('ud', 200, 'rgb(255,0,0)',7920,170,40,40);
var enemy20 = createEnemy('ud', 200, 'rgb(255,0,0)',9060,340,40,40);
var enemy21 = createEnemy('ud', 200, 'rgb(255,0,0)',9720,340,40,40);
/* var enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8]; */
	
var tranny1 = Crafty.e("tranny1, 2D, DOM, Color, Collision")
	.color(tranny_color1)
	.attr({x: 2830, y: 130, w: 20, h: 20})
	.collision();

var tranny2 = Crafty.e("tranny2, 2D, DOM, Color, Collision")
	.color(tranny_color2)
	.attr({x: 5585, y: 200, w: 20, h: 20})
	.collision();

var tranny3 = Crafty.e("tranny3, 2D, DOM, Color, Collision")
	.color(tranny_color3)
	.attr({x: 8300, y: 420, w: 20, h: 20})
	.collision();
	
var tranny4 = Crafty.e("tranny4, 2D, DOM, Color, Collision")
	.color(tranny_color4)
	.attr({x: 10780, y: 220, w: 20, h: 20})
	.collision();
    
var sherwood = Crafty.e("Player, 2D, DOM, Color, Gravity, Twoway, Controls, Collision, walkleft, walkright, SpriteAnimation")
    .color('rgb(0,0,255)')
    .attr({ x: 100, y: 150, w: 60, h: 60, 
            dX: Crafty.math.randomInt(2, 5), 
            dY: Crafty.math.randomInt(2, 5) })
    .bind("NewDirection", function (direction) {
    			 if ((direction.x < 0) && (!this.isPlaying("walk_left"))) this.stop().animate("walk_left", 6, -1);
    			 if ((direction.x > 0) && (!this.isPlaying("walk_right"))) this.stop().animate("walk_right", 3, -1);
/*
		        if (direction.x < 0) {
		            if (!this.sprite.isPlaying("walk"))
		                this.sprite.stop().animate("walk", 0, 0, 6)
		        }
		        if (direction.x > 0) {
		            if (!this.sprite.isPlaying("walk"))
		                this.sprite.stop().animate("walk", 0, 0, 6)
		        }
*/
		        if(!direction.x && !direction.y) {
		            this.stop();
		        }
		  })
    .gravity("platform")
    .gravityConst(.1)
    .animate('walk_left', 0, 0, 6)
    .animate('walk_right', 0, 1, 3)
    .twoway(playerSpeed, playerJump)// 1=1, 1.2=5 2=15, 3=50, 4=80, 5=120
    .collision()
    .bind('EnterFrame', function () {
		Crafty.viewport.x = -this.x+100;
    })
	.onHit('platform',function(ent){
		var target = ent[0]; //get the object of the collided EntityReference
		if(this.y>target.obj._y){
			this.y = target.obj._y+target.obj._h;
		}
	})
	.onHit('tranny1', function(ent){
		tranny1.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny1.isDown('SPACE') && point1 == false) {
				tranny_color1 = 'rgb(255,255,255)';
				tranny1.color(tranny_color1);
				point1 = true;
				playerSpeed = 2;
				playerJump = 2;
				console.log(playerJump);
				sherwood.twoway(playerSpeed, -3)
			}
		});
	})
	.onHit('tranny2', function(ent){
		tranny2.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny2.isDown('SPACE') && point2 == false) {
				tranny_color2 = 'rgb(255,255,255)';
				tranny2.color(tranny_color2);
				point2 = true;
			}
		});
	})
	.onHit('tranny3', function(ent){
		tranny3.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny3.isDown('SPACE') && point3 == false) {
				tranny_color3 = 'rgb(255,255,255)';
				tranny3.color(tranny_color3);
				point3 = true;
			}
		});
	})
	.onHit('tranny4', function(ent){
		tranny4.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny4.isDown('SPACE') && point4 == false) {
				tranny_color4 = 'rgb(255,255,255)';
				tranny4.color(tranny_color4);
				point4 = true;
			} 
		});
	})
	.onHit('enemy', function(ent){
		console.log("You're hurting me!!!");
		Crafty.scene("dead");
	/*
	this.x += Math.ceil(target.normal.x * -target.overlap);
	this.y += Math.ceil(target.normal.y * -target.overlap);
	*/
	});

  });
  Crafty.scene("loading");
});
