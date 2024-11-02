class AnimationController {
  constructor(spriteSize) {
    // Set the frame size for the sprite animations
    this.frameSize = new Vector2(48, 48);

    // Set the offset for the sprite rendering
    this.spriteOffset = new Vector2(-10, 0);

    // Store the size of the sprite
    this.spriteSize = spriteSize;

    // Initialize an object to hold all animations
    this.animations = {};

    // Track the current animation being played
    this.currentAnimation = null;

    // Name of the currently active animation
    this.currentAnimationName = "";
  }

  // Add a new animation to the controller
  addAnimation(
    name,
    src,
    frameCount,
    frameDuration,
    loop = true,
    animationLocked = false
  ) {
    this.animations[name] = new SpriteAnimation(
      src,
      this.frameSize,
      this.spriteSize,
      this.spriteOffset,
      frameCount,
      frameDuration,
      loop,
      animationLocked
    );
  }

  // Play a specified animation by name
  playAnimation(name, overrideAnimation = false) {
    // Check if the animation exists
    if (!this.animations[name]) {
      console.warn(`Animation "${name}" does not exist.`);
      return;
    }

    // Prevent playing if the current animation is locked
    if (
      this.currentAnimation?.animationLocked &&
      this.currentAnimation.isAnimating &&
      !overrideAnimation
    )
      return;

    // Return if the same animation is already playing and it's not locked
    if (
      name === this.currentAnimationName &&
      !this.currentAnimation.animationLocked
    )
      return;

    // Stop the current animation if it exists
    if (this.currentAnimation) {
      this.currentAnimation.stop();
    }

    // Set the new current animation and start it
    this.currentAnimationName = name;
    this.currentAnimation = this.animations[name];
    this.currentAnimation.start();
  }

  // Draw the current animation at a specified position and direction
  draw(pos, direction = 1) {
    if (this.currentAnimation) {
      this.currentAnimation.setDirection(direction); // Set the direction for the animation
      this.currentAnimation.setPos(pos); // Set the position for the animation
      this.currentAnimation.draw(); // Draw the current animation frame
    }
  }

  // Stop the current animation
  stopAnimation() {
    if (this.currentAnimation) {
      this.currentAnimation.stop(); // Stop the animation
      this.currentAnimation = null; // Clear the reference to the current animation
    }
  }

  // Check if the current animation is active
  isAnimating() {
    return this.currentAnimation ? this.currentAnimation.isAnimating : false;
  }
}
