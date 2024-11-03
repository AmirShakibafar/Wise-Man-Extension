class SpriteAnimation {
  constructor(
    src,
    frameSize,
    spriteSize,
    offset = new Vector2(0, 0),
    frameCount,
    frameDuration,
    loop = true,
    animationLocked = false
  ) {
    // Position of the animation on the canvas
    this.pos = new Vector2(0, 0);

    // Spritesheet image for the animation
    this.spritesheet = new Image();

    // Size of each frame in the spritesheet
    this.frameSize = frameSize;

    // Offset for rendering the sprite
    this.offset = offset;

    // Size of the sprite when drawn
    this.spriteSize = spriteSize;

    // Total number of frames in the animation
    this.frameCount = frameCount;

    // Duration each frame is displayed in milliseconds
    this.frameDuration = frameDuration;

    // Index of the current frame being displayed
    this.currentFrame = 0;

    // Flag to check if the animation is currently playing
    this.isAnimating = false;

    // Flag to lock the animation, preventing it from being interrupted
    this.animationLocked = animationLocked;

    // ID for the animation frame request
    this.animationRequestId = null;

    // Flag to check if the spritesheet is loaded
    this.isSpriteLoaded = false;

    // Direction for flipping the sprite (1 for normal, -1 for flipped)
    this.direction = 1;

    // Flag to indicate if the animation should loop
    this.loop = loop;

    // Timestamp of the last frame update
    this.lastFrameTime = 0;

    // Initialize the sprite with the provided source image
    this.initSprite(src);
  }

  // Load the spritesheet image and set the loaded flag
  initSprite(src) {
    this.spritesheet.src = src; // Set the image source
    this.spritesheet.onload = () => (this.isSpriteLoaded = true); // Update the loaded flag when the image is ready
  }

  // Start playing the animation
  start() {
    if (this.isAnimating) return; // Do not start if already animating
    this.isAnimating = true; // Set the animating flag
    this.currentFrame = 0; // Reset to the first frame
    this.lastFrameTime = performance.now(); // Record the current time
    this.play(); // Begin playing the animation
  }

  // Set the current frame index, wrapping around if needed
  setFrame(index) {
    this.currentFrame = index % this.frameCount;
  }

  // Update the position of the animation
  setPos(pos) {
    this.pos = pos; // Set the new position
  }

  // Main play loop for the animation
  play() {
    if (!this.isAnimating) return; // Exit if not animating
    const now = performance.now(); // Get the current time
    const elapsedTime = now - this.lastFrameTime; // Calculate elapsed time since last frame

    // Update the frame if enough time has passed
    if (elapsedTime >= this.frameDuration) {
      this.lastFrameTime = now; // Update last frame time
      if (this.loop) {
        // Loop the animation by wrapping around the frame count
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      } else if (this.currentFrame < this.frameCount - 1) {
        this.currentFrame++; // Move to the next frame
      } else {
        this.stop(); // Stop the animation if not looping
        return;
      }
    }

    // Request the next animation frame
    this.animationRequestId = requestAnimationFrame(() => this.play());
  }

  // Set the direction for rendering the sprite
  setDirection(direction) {
    this.direction = direction; // Update the direction
  }

  // Draw the current frame of the animation on the canvas
  draw() {
    if (!this.isSpriteLoaded) return; // Exit if the sprite is not loaded

    // Calculate the source coordinates for the current frame
    const sx = this.offset.x + this.currentFrame * this.frameSize.x;
    const sy = this.offset.y;

    context.save(); // Save the current context state
    // Move and scale the context for the direction and position
    context.translate(
      this.pos.x + this.spriteSize.x / 2,
      this.pos.y + this.spriteSize.y / 2
    );
    context.scale(this.direction, 1); // Flip if direction is -1
    context.translate(
      -(this.pos.x + this.spriteSize.x / 2),
      -(this.pos.y + this.spriteSize.y / 2)
    );

    // Draw the current frame from the spritesheet onto the canvas
    context.drawImage(
      this.spritesheet,
      sx,
      sy,
      this.frameSize.x,
      this.frameSize.y, // Source rectangle
      this.pos.x,
      this.pos.y,
      this.spriteSize.x,
      this.spriteSize.y // Destination rectangle
    );

    context.restore(); // Restore the context to its original state
  }

  // Stop the animation
  stop() {
    this.isAnimating = false; // Update the animating flag
    cancelAnimationFrame(this.animationRequestId); // Cancel the animation frame request
    this.animationRequestId = null; // Clear the request ID
  }
}
