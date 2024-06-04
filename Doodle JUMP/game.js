// Initialisation de kaboom.js
kaboom({
    width: 640,
    height: 480,
    font: "sinko",
    background: [0, 0, 0],
});

// Chargement des sprites
//loadSprite("player", "Assets/doodler-guy.png");

loadSprite("player", "Assets/playerPrincipal.png", {
    sliceX: 23,
    sliceY: 1,
    anims: {
        idle: {
            from: 0,
            to: 9,
            loop: true,
            speed: 9
        },
        jump: {
            from: 10,
            to: 13,
            loop: true,
            speed:3
        },
        runDroite: {
            from: 14,
            to: 22,
            loop: true,
            speed: 6
        }
    }
})

// Set the gravity acceleration (pixels per second)
setGravity(1600);

// Define player movement speed (pixels per second)
const SPEED = 320;

// Add player game object with body component for gravity and jumping
const player = add([
    sprite("player"),
    pos(center()),
    area(),
    body(),
    scale(2),
    //insérer un tag au moins c'est plus simple de l'appeler dans les onCollide p.ex. 
    "player"
]);

//pour mieux réussir à activer les mouvements 
let animEnCours = false 

//mettre comme comportement de défaut le idle
player.play("idle")

// Ensure player object is properly initialized
if (!player) {
    debug.error("Player object initialization failed");
}

// Jump when space is pressed
onKeyPress("space", () => {
    if (player.isGrounded()) {
        //j'arrive pas encore très bien à charger l'animation quand le player saute parce que j'ai jamais travaillé avec, mais à voir
        player.play("jump")
        player.jump()
    }
});

onKeyRelease("space", () => {
    player.play("idle");
    animEnCours = false;
}); 

// Log a message when the player hits the ground
player.onGround(() => {
    debug.log("ouch");
});

// Continuous check for space key being held down to adjust jump height
/*onUpdate(() => {
    if (isKeyDown("space")) {
        if (!player.isGrounded() && player.vel.y < 0) {
            player.vel.y -= dt() * 600;
        }
    }
});*/

// Move the player with arrow keys
/*onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});*/

onKeyDown("left", () => {
    if(!animEnCours) {
        player.play("runDroite");
        player.flipX = true;
        animEnCours = true;
    }
    player.move(-SPEED, 0)
    if (player.pos.x < 0) {
        player.pos.x = width()
    }
});

onKeyRelease("left", () => {
    player.play("idle");
    animEnCours = false;
}); 

onKeyDown("right", () => {
    if(!animEnCours) {
        player.play("runDroite");
        player.flipX = false;
        animEnCours = true;
    }
    player.move(SPEED, 0)
    if (player.pos.x > width()) {
        player.pos.x = 0
    }
});

onKeyRelease("right", () => {
    player.play("idle");
    animEnCours = false;
}); 

// Add a platform to hold the player
add([
    rect(width(), 48),
    outline(4),
    area(),
    pos(0, height() - 48),
    body({ isStatic: true }),
]);

// Add text instructions
add([
    text("Press space key for jumping, arrow keys for movement", { width: width() / 2 }),
    pos(12, 12),
]);
