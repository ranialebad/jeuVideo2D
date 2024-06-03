// Start a kaboom game
kaboom({
    scale: 4,  // Scale the whole game up
    font: "monospace",  // Set the default font
})

// Loading a multi-frame sprite
loadSprite("dino", "/Character/free-3-character-sprite-sheets-pixel-art/3 SteamMan/SteamMan_craft.png", {
    sliceX: 6,  // The image contains 6 frames layed out horizontally, slice it into individual frames
    anims: {
        "idle": {
            from: 0,
            to: 2,
            speed: 5,
            loop: true,
        },
        "run": {
            from: 3,
            to: 5,
            speed: 10,
            loop: true,
        },
        "jump": {
            from: 5,
            to: 5,
            speed: 1,
            loop: false,
        },
    },
})

const SPEED = 120
const JUMP_FORCE = 240

setGravity(640)

// Add our player character
const player = add([
    sprite("dino"),
    pos(center()),
    anchor("center"),
    area(),
    body(),
])

player.play("idle")

// Add a platform
add([
    rect(width(), 24),
    area(),
    outline(1),
    pos(0, height() - 24),
    body({ isStatic: true }),
])

// Switch to "idle" or "run" animation when player hits ground
player.onGround(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
        player.play("idle")
    } else {
        player.play("run")
    }
})

player.onAnimEnd((anim) => {
    if (anim === "idle") {
        // You can also register an event that runs when certain anim ends
    }
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
        player.play("jump")
    }
})

onKeyDown("left", () => {
    player.move(-SPEED, 0)
    player.flipX = true
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run")
    }
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
    player.flipX = false
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run")
    }
})

;["left", "right"].forEach((key) => {
    onKeyRelease(key, () => {
        if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        }
    })
})

const getInfo = () => `
Anim: ${player.curAnim()}
Frame: ${player.frame}
`.trim()

// Add some text to show the current animation
const label = add([
    text(getInfo(), { size: 12 }),
    color(0, 0, 0),
    pos(4),
])

label.onUpdate(() => {
    label.text = getInfo()
})
