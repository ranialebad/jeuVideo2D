// Importing the Kaboom library
kaboom({
    width: 1200,
    height: 800,
    background: [0, 0, 0],
});

// Loading assets
loadRoot("Assets/");
loadSprite("Cover", "Images/Couverture.png");
loadSprite("Intro_Dialogue1", "Images/Intro_Dialogue1.png");
loadSprite("Intro_Dialogue2", "Images/Intro_Dialogue2.png");
loadSprite("Intro_Dialogue3", "Images/Intro_Dialogue3.png");
loadSprite("Intro_Dialogue4", "Images/Intro_Dialogue4.png");
loadSprite("medievalBackground1", "Images/medievalbackground1.png");
loadSprite("medievalBackground2", "Images/medievalbackground2.png");

function calculateTextboxWidth(text, fontSize = 32) {
    // Assume each character is about half the font size in width
    const charWidth = fontSize * 0.5;
    return Math.min(width() - 100, charWidth * text.length + 20); // Ensure width does not exceed screen width
}

// Cover scene
scene("cover", () => {
    add([
        sprite("Cover", {
            width: width(),
            height: height(),
            fixed: true,
        }),
    ]);

    const coverText = "Press space to play";
    const textboxWidth = calculateTextboxWidth(coverText);

    const textbox = add([
        rect(textboxWidth, 100, { radius: 32 }),
        pos(center().x, center().y + 200),
        anchor("center"),
        outline(4),
        color(255, 255, 255),
    ]);

    add([
        text(coverText, {
            size: 32,
            width: textboxWidth - 20,
            wrap: true,
        }),
        pos(center().x, center().y + 200),
        anchor("center"),
        color(0, 0, 0),
    ]);

    onKeyPress("space", () => {
        go("introduction");
    });
});

// Introduction scene
scene("introduction", () => {
    const dialogs = [
        {
            sprite: sprite("Intro_Dialogue1", { width: width(), height: height(), fixed: true }),
            text: "Welcome to ‘PALIMPSEST’, a game where you play as a historical researcher dedicated to restoring an ancient site through the ages.",
        },
        {
            sprite: sprite("Intro_Dialogue2", { width: width(), height: height(), fixed: true }),
            text: "The greatest researchers of our time have created an object like no other: a time machine. With the help of this invention, a handpicked personality will be entrusted with the mission of discovering and restoring the various construction phases of this historic site.",
        },
        {
            sprite: sprite("Intro_Dialogue3", { width: width(), height: height(), fixed: true }),
            text: "Talks between scientists and politicians have been difficult...",
        },
        {
            sprite: sprite("Intro_Dialogue4", { width: width(), height: height(), fixed: true }),
            text: "But YOU have been chosen to take up this challenge! Good luck on your transperiodic journey...",
        },
    ];

    let currentDialog = 0;

    const dialogDisplay = add([
        dialogs[currentDialog].sprite,
    ]);

    function updateTextboxWidth(text) {
        return calculateTextboxWidth(text);
    }

    function createTextbox(text) {
        const textboxWidth = updateTextboxWidth(text);

        return add([
            rect(textboxWidth, 100, { radius: 32 }),
            pos(center().x, height() - 80),
            anchor("center"),
            outline(4),
            color(255, 255, 255),
        ]);
    }

    const textbox = createTextbox(dialogs[currentDialog].text);

    const dialogText = add([
        text(dialogs[currentDialog].text, { size: 32, width: textbox.width - 20, wrap: true }),
        pos(center().x, height() - 80),
        anchor("center"),
        color(0, 0, 0),
    ]);

    function updateDialogue() {
        dialogDisplay.use(dialogs[currentDialog].sprite);
        textbox.width = updateTextboxWidth(dialogs[currentDialog].text);
        dialogText.text = dialogs[currentDialog].text;
    }

    onKeyPress("space", () => {
        currentDialog++;
        if (currentDialog < dialogs.length) {
            updateDialogue();
        } else {
            // Transition to the next scene after the last dialogue
            go("medievalIntro");
        }
    });

    // Initial display of the first dialogue
    updateDialogue();
});

scene("medievalIntro", () => {
    add([
        sprite("medievalBackground1", {
            width: width(),
            height: height(),
            fixed: true,
        }),
    ]);

    const medievalIntroText = "Press space to play";
    const textboxWidth = calculateTextboxWidth(medievalIntroText);

    const textbox = add([
        rect(textboxWidth, 100, { radius: 32 }),
        pos(center().x, center().y + 200),
        anchor("center"),
        outline(4),
        color(255, 255, 255),
    ]);

    add([
        text(medievalIntroText, {
            size: 32,
            width: textboxWidth - 20,
            wrap: true,
        }),
        pos(center().x, center().y + 200),
        anchor("center"),
        color(0, 0, 0),
    ]);

    onKeyPress("space", () => {
        go("medievalArea1");
    });
});

scene("medievalArea1", () => {
    add([
        sprite("medievalBackground2", {
            width: width(),
            height: height(),
            fixed: true,
        }),
    ]);

    const medievalArea1Text = "Press space to play";
    const textboxWidth = calculateTextboxWidth(medievalArea1Text);

    const textbox = add([
        rect(textboxWidth, 100, { radius: 32 }),
        pos(center().x, center().y + 200),
        anchor("center"),
        outline(4),
        color(255, 255, 255),
    ]);

    add([
        text(medievalArea1Text, {
            size: 32,
            width: textboxWidth - 20,
            wrap: true,
        }),
        pos(center().x, center().y + 200),
        anchor("center"),
        color(0, 0, 0),
    ]);

    const player = add([
        rect(32, 64),
        pos(width() * 0.5, 0),
        body()
    ])
    const floor = add([
        pos(0, height()),
        rect(width(), 50),
        solid()
    ])

    onKeyPress("space", () => {
        go("introduction");
    });
});

// Start cover scene
go("cover");
