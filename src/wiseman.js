class WiseMan {
  constructor(
    position,
    size,
    scale,
    canvasWidth,
    idleAnimationURI,
    runAnimationURI,
    jumpAnimationURI
  ) {
    this.position = position;
    this.size = size.mul(scale);
    this.velocity = new Vector2(0.5, 0); // Initial horizontal movement speed
    this.canvasWidth = canvasWidth;
    this.direction = 1;
    this.isOnGround = false;
    this.isHovered = false;
    this.isClicked = false;
    this.gravity = new Vector2(0, 0.2); // Constant gravity vector
    this.animationController = new AnimationController(this.size);
    this.initializeAnimations(
      idleAnimationURI,
      runAnimationURI,
      jumpAnimationURI
    );
  }

  initializeAnimations(idleAnimationURI, runAnimationURI, jumpAnimationURI) {
    this.animationController.addAnimation("Idle", idleAnimationURI, 4, 100);
    this.animationController.addAnimation("Hover", idleAnimationURI, 4, 100);
    this.animationController.addAnimation("Run", runAnimationURI, 6, 100);
    this.animationController.addAnimation("Jump", jumpAnimationURI, 4, 100);
    this.animationController.playAnimation("Idle"); // Start with idle animation
  }

  updatePosition() {
    // Apply gravity when the sprite is in the air
    if (this.isHovered) {
      return;
    }
    if (!this.isOnGround) {
      this.velocity = this.velocity.add(this.gravity);
    }

    // Update position based on velocity
    this.position = this.position.add(this.velocity);

    // Check for ground collision
    this.checkGroundCollision();

    // Reverse direction at canvas edges if on the ground
    if (
      this.isOnGround &&
      (this.position.x <= 0 ||
        this.position.x + this.size.x >= this.canvasWidth)
    ) {
      this.velocity.x *= -1; // Reverse direction
      this.direction *= -1; // Flip rendering direction
    }
  }

  checkGroundCollision() {
    // Check if the sprite’s bottom edge is touching the ground
    if (this.position.y + this.size.y >= ground.position.y) {
      this.velocity.y = 0; // Stop vertical movement
      this.position.y = ground.position.y - this.size.y; // Position on top of the ground
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }

  updateAnimationState() {
    // Adjust animation based on movement and ground state
    if (this.isHovered) {
      this.animationController.playAnimation("Hover");
      return;
    }
    if (this.isOnGround) {
      if (Math.abs(this.velocity.x) > 0.1) {
        this.animationController.playAnimation("Run"); // Running animation
      } else {
        this.animationController.playAnimation("Idle"); // Idle animation
      }
    } else {
      this.animationController.playAnimation("Jump"); // Jumping animation
    }
  }

  render() {
    this.animationController.draw(this.position, this.direction); // Draw sprite based on current animation and direction
  }

  update() {
    this.updatePosition();
    this.updateAnimationState();
    this.render();
  }
}
