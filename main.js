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

let quotesIndex = 0; // Index for tracking current quote
const dialogBox = new DialogBox();

// Function to resize canvas and update properties depending on canvas dimensions
const resizeCanvas = () => {
  sprite.canvasWidth = canvas.width = innerWidth;
  canvas.height = 220;
  ground.size = new Vector2(canvas.width, 20);
  ground.position = new Vector2(0, canvas.height - 20);
  context.imageSmoothingEnabled = false;
};

// Function to render the background
const renderBackground = () => {
  context.fillStyle = "#172A3A";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

// Function to show a message in the sprite's dialog box
const showHoverDialog = (message) => {
  if (message) {
    dialogBox.show(message); // Show dialog above sprite
  } else {
    dialogBox.hide(); // Hide dialog when not hovering
  }
};

const showEyesAlert = (con) => {
  if (con) {
    eyesAlert.show(); // Show dialog above sprite
  } else {
    eyesAlert.hide(); // Hide dialog when not hovering
  }
};
// Game loop function
const gameLoop = () => {
  // Render the background
  renderBackground();

  // Render the ground
  ground.render("#004346");

  // Update the sprite's position and animation
  sprite.update(); // Apply gravity and check for collisions here
  sprite.velocity.add(GRAVITY); // Apply gravity to sprite's velocity
  sprite.position.add(sprite.velocity); // Update sprite's position based on velocity

  // Show dialog if hovered and quotes are available
  if (sprite.isHovered && sprite.isClicked) {
    const quoteElement = window.quotesArray[quotesIndex]; // Get the current quote
    showHoverDialog(`${quoteElement.quote} - ${quoteElement.author}`);
  } else {
    // Call showHoverDialog with empty message to hide it when not hovering
    showHoverDialog("");
    sprite.isClicked = false;
  }

  // Request the next frame
  requestAnimationFrame(gameLoop);
};

// Event listeners
// Helper function to check if the mouse is within the sprite's boundaries
function isMouseWithinSprite(mouseX, mouseY, sprite) {
  return (
    mouseX >= sprite.position.x &&
    mouseX <= sprite.position.x + sprite.size.x &&
    mouseY >= sprite.position.y &&
    mouseY <= sprite.position.y + sprite.size.y
  );
}

// Add an event listener for the mousemove event on the canvas
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the mouse is within the WiseMan sprite's boundaries
  sprite.isHovered = isMouseWithinSprite(mouseX, mouseY, sprite);
});

// Add event listener for mouse click to cycle quotes
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the mouse is within the WiseMan sprite's boundaries
  if (isMouseWithinSprite(mouseX, mouseY, sprite)) {
    // Increment index and wrap around
    quotesIndex = (quotesIndex + 1) % window.quotesArray.length;
    sprite.isClicked = true;
  }
});

// Add event listener for window resize
window.addEventListener("resize", resizeCanvas);

// Initial call to set canvas size
resizeCanvas();

// Call the function to populate quotesArray
// Fetch quotes and start the game loop

const executeAfterFetchingQuotes = async () => {
  await readQuotesFromFile(); // Waits for asyncFunction to complete
  gameLoop();
};

showEyesAlert(true);

executeAfterFetchingQuotes();
