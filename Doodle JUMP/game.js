// Initialisation de kaboom.js
kaboom({
    width: 640,
    height: 480,
    font: "sinko",
    background: [0, 0, 0],
});

// Chargement des sprites
loadSprite("player", "Assets/doodler-guy.png");

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
]);

// Ensure player object is properly initialized
if (!player) {
    debug.error("Player object initialization failed");
}

// Jump when space is pressed
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
    }
});

// Log a message when the player hits the ground
player.onGround(() => {
    debug.log("ouch");
});

// Continuous check for space key being held down to adjust jump height
onUpdate(() => {
    if (isKeyDown("space")) {
        if (!player.isGrounded() && player.vel.y < 0) {
            player.vel.y -= dt() * 600;
        }
    }
});

// Move the player with arrow keys
onKeyDown("left", () => {
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
