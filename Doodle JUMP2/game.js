// Initialisation de kaboom.js
kaboom({
    width: 640,
    height: 480,
    font: "sinko",
    background: [0, 0, 0],
});

// Chargement des sprites
loadSprite("platform", "Assets/platform.png");
loadSprite("medTower", "Assets/medTower.png");
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
            speed: 3
        },
        runDroite: {
            from: 14,
            to: 22,
            loop: true,
            speed: 6
        }
    }
});

// Fonction principale pour initialiser la scène principale
function mainScene() {
    // Ajouter l'arrière-plan (en dehors de l'influence de la caméra)
    add([
        sprite("medTower", { width: 640, height: 480 }),
        pos(0, 0),
        fixed()
    ]);

    // Liste des plateformes existantes
    const platforms = [];

    // Limite de génération des plateformes
    const MAX_PLATFORMS = 20;

    // Fonction pour vérifier si deux rectangles se chevauchent
    function checkOverlap(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect2.height > rect2.y
        );
    }

    // Fonction pour générer une plateforme au-dessus de la précédente
    function generatePlatform() {
        if (platforms.length >= MAX_PLATFORMS) {
            return;
        }

        let newPlatform;
        let overlap;
        let yPos = height() - 100;

        if (platforms.length > 0) {
            yPos = platforms[platforms.length - 1].y - 150;
        }

        do {
            overlap = false;
            const xPos = rand(0, width() - 100);
            newPlatform = {
                x: xPos,
                y: yPos,
                width: 100,
                height: 20,
            };

            for (let platform of platforms) {
                if (checkOverlap(newPlatform, platform)) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);

        platforms.push(newPlatform);
        const isLastPlatform = platforms.length === MAX_PLATFORMS;

        const platformObj = add([
            sprite("platform"),
            pos(newPlatform.x, newPlatform.y),
            area(),
            scale(1.8),
            body({ isStatic: true }),
            "platform",
            {
                playerOnPlatform: false,
                timer: 0,
                isLastPlatform: isLastPlatform
            }
        ]);

        platformObj.onUpdate(() => {
            if (platformObj.playerOnPlatform) {
                platformObj.timer += dt();
                if (platformObj.timer > 3) {
                    destroy(platformObj);
                }
            } else {
                platformObj.timer = 0;
            }
        });
    }

    // Créer des plateformes à intervalles réguliers jusqu'à atteindre la limite
    loop(2, () => {
        if (platforms.length < MAX_PLATFORMS) {
            generatePlatform();
        }
    });

    setGravity(1600);

    const SPEED = 320;
    const JUMP_FORCE = 800;

    const player = add([
        sprite("player"),
        pos(center()),
        area(),
        body(),
        scale(2),
        "player"
    ]);

    let animEnCours = false;

    player.play("idle");

    if (!player) {
        debug.error("Player object initialization failed");
    }

    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.play("jump");
            player.jump(JUMP_FORCE);
        }
    });

    onKeyRelease("space", () => {
        player.play("idle");
        animEnCours = false;
    });

    player.onGround(() => {
        debug.log("ouch");
    });

    onKeyDown("left", () => {
        if (!animEnCours) {
            player.play("runDroite");
            player.scale.x = -2;
            animEnCours = true;
        }
        player.move(-SPEED, 0);
        if (player.pos.x < 0) {
            player.pos.x = width();
        }
    });

    onKeyRelease("left", () => {
        player.play("idle");
        animEnCours = false;
    });

    onKeyDown("right", () => {
        if (!animEnCours) {
            player.play("runDroite");
            player.scale.x = 2;
            animEnCours = true;
        }
        player.move(SPEED, 0);
        if (player.pos.x > width()) {
            player.pos.x = 0;
        }
    });

    onKeyRelease("right", () => {
        player.play("idle");
        animEnCours = false;
    });

    add([
        rect(width(), 48),
        outline(4),
        area(),
        pos(0, height() - 48),
        body({ isStatic: true }),
    ]);

    // Ajouter les instructions à l'écran
    const instructionText = add([
        text("Si tu presses 'enter', tu peux recommencer le niveau", { width: width() / 2 }),
        pos(12, 48),
    ]);

    add([
        text("Press space key for jumping, arrow keys for movement", { width: width() / 2 }),
        pos(12, 12),
    ]);

    onKeyPress("enter", () => {
        go("main");
    });

    onKeyPress("space", () => {
        destroy(instructionText);
    });

    onCollide("player", "platform", (p, plat) => {
        plat.playerOnPlatform = true;
        if (plat.isLastPlatform) {
            go("nextScene");
        }
    });

    onCollideEnd("player", "platform", (p, plat) => {
        plat.playerOnPlatform = false;
    });

    player.onUpdate(() => {
        camPos(player.pos);
        if (player.pos.y > height()) {
            go("main");
        }
    });
}

// Scène principale
scene("main", mainScene);

// Scène suivante
scene("nextScene", () => {
    add([
        text("Next Scene", { size: 48 }),
        pos(center()),
        anchor("center")
    ]);
});

// Initialisation de la scène principale
go("main");
