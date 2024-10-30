// Create a canvas element and get the 2D context for drawing
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// Append the canvas to the body of the document
document.body.append(canvas);

// Set frames per second (not necessary with requestAnimationFrame but kept for reference)
const FPS = 120;

// Define gravity as a small downward force (affects sprite's vertical velocity)
const GRAVITY = new Vector2(0, 0.1);

// Function to resize canvas and update properties depending on canvas dimensions
function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = 250;

    // Update sprite boundaries and ground position based on new canvas size
    if (sprite) {
        sprite.canvasWidth = canvas.width;
    }
    ground.size = new Vector2(canvas.width, 100);
    ground.position = new Vector2(0, canvas.height - 100);
    context.imageSmoothingEnabled = false;
}

// Create the ground as a rectangle at the bottom of the screen
const ground = new Rect2(new Vector2(0, canvas.height - 100), new Vector2(canvas.width, 100));

// Function to render the background, filling it with sky blue
const renderBackground = () => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

// Initial call to set canvas size
resizeCanvas();

// Add event listener for window resize
window.addEventListener("resize", resizeCanvas);

// Disable image smoothing for a pixelated style (useful for pixel art or low-res graphics)
context.imageSmoothingEnabled = false;

// Main game loop using requestAnimationFrame
function gameLoop() {
    // Render the background
    renderBackground();

    // Render the ground
    ground.render();

    // Update the sprite's position and animation
    if (sprite) {
        sprite.update(); // Apply gravity and check for collisions here
        // Example gravity application:
        sprite.velocity.add(GRAVITY); // Apply gravity to sprite's velocity
        sprite.position.add(sprite.velocity); // Update sprite's position based on velocity

        // Collision with ground (simple check)
        if (sprite.position.y + sprite.height >= ground.position.y) {
            sprite.position.y = ground.position.y - sprite.height; // Reset sprite position
            sprite.velocity.y = 0; // Stop falling
        }
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
