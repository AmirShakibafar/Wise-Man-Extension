// Create a canvas element and get the 2D context for drawing
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
document.body.append(canvas);


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
    dialogBox.show(message); 
  } else {
    dialogBox.hide(); 
  }
};

const showEyesAlert = (condition) => {
  if (condition) {
      alertManager.enqueue(eyesAlert, 10000); // Show for 10 seconds for testing
  } else {
      eyesAlert.hide();
  }
};

const showWaterAlert = (condition) => {
  if (condition) {
      alertManager.enqueue(waterAlert, 10000); // Show for 10 seconds for testing
  } else {
      waterAlert.hide(); 
  }
};

const showWalkAlert = (condition) => {
  if (condition) {
      alertManager.enqueue(walkAlert, 10000); // Show for 10 seconds for testing
  } else {
      walkAlert.hide(); 
  }
};



// Game loop function
const gameLoop = () => {
  renderBackground();
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

  sprite.isHovered = isMouseWithinSprite(mouseX, mouseY, sprite);
});

// Add event listener for mouse click to cycle quotes
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;


  if (isMouseWithinSprite(mouseX, mouseY, sprite)) {
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
  window.quotesArray = shuffle(window.quotesArray); // Shuffle the quotes
  gameLoop();
};

const alertManager = new AlertManager();
setInterval(() => {
  alertManager.enqueue(waterAlert, 2000); // Queue water alert every 20 seconds for testing
}, 10000); // Replace with actual timing

setInterval(() => {
  alertManager.enqueue(walkAlert, 2000); // Queue walk alert every 30 seconds for testing
}, 20000); // Replace with actual timing

setInterval(() => {
  alertManager.enqueue(eyesAlert, 2000); // Queue eyes alert every 20 seconds for testing
}, 5000); // Replace with actual timing





executeAfterFetchingQuotes();
