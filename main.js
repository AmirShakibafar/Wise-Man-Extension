// Create a canvas element and get the 2D context for drawing
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
document.body.append(canvas);

// Set frames per second (not necessary with requestAnimationFrame but kept for reference)
const FPS = 120;

// Define gravity as a small downward force (affects sprite's vertical velocity)
const GRAVITY = new Vector2(0, 0.1);

// Create the ground as a rectangle at the bottom of the screen
const ground = new Rect2(
  new Vector2(0, canvas.height - 100),
  new Vector2(canvas.width, 0)
);

const dialogBox = new DialogBox();

// Functions
// Function to resize canvas and update properties depending on canvas dimensions
const resizeCanvas = () => {
  sprite.canvasWidth = canvas.width = innerWidth;
  canvas.height = 200;
  ground.size = new Vector2(canvas.width, 20);
  ground.position = new Vector2(0, canvas.height - 20);
  context.imageSmoothingEnabled = false;
};

// Function to render the background
const renderBackground = () => {
  context.fillStyle = "#172A3A";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

// Function to show a messege in sprites dialog box
const showHoverDialog = (message) => {
  if (sprite.isHovered) {
    dialogBox.show(`${message}`, sprite.position.x, sprite.position.y); // Show dialog above sprite
  } else {
    dialogBox.hide(); // Hide dialog when not hovering
  }
};

// Update the game loop to include the dialog display logic
const gameLoop = () => {
  // Render the background
  renderBackground();

  // Render the ground
  ground.render("#004346");

  // Update the sprite's position and animation

  sprite.update(); // Apply gravity and check for collisions here
  sprite.velocity.add(GRAVITY); // Apply gravity to sprite's velocity
  sprite.position.add(sprite.velocity); // Update sprite's position based on velocity

  // Show dialog if hovered
  showHoverDialog("hello to all of you!");
  // Request the next frame
  requestAnimationFrame(gameLoop);
};

// Event listeners
// Add an event listener for the mousemove event on the canvas
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the mouse is within the WiseMan sprite's boundaries
  if (
    mouseX >= sprite.position.x &&
    mouseX <= sprite.position.x + sprite.size.x &&
    mouseY >= sprite.position.y &&
    mouseY <= sprite.position.y + sprite.size.y
  ) {
    sprite.isHovered = true;
  } else {
    sprite.isHovered = false;
  }
});

// Add event listener for window resize
window.addEventListener("resize", resizeCanvas);

// Initial call to set canvas size
resizeCanvas();
// Start the game loop
gameLoop();
