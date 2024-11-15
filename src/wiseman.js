class WiseMan {
  constructor(
    position,
    size,
    scale,
    canvasWidth,
    idleAnimationURI,
    walkAnimationURI,
    stickUpAnimationURI,
    pointUpAnimationURI
  ) {
    this.position = position;
    this.size = size.mul(scale);
    this.velocity = new Vector2(0.25, 0); // Initial horizontal movement speed
    this.canvasWidth = canvasWidth;
    this.direction = 1;
    this.isOnGround = false;
    this.isHovered = false;
    this.isClicked = false;
    this.isAlerted = false;
    this.gravity = new Vector2(0, 0.2); // Constant gravity vector
    this.animationController = new AnimationController(this.size);
    this.initializeAnimations(
      idleAnimationURI,
      walkAnimationURI,
      stickUpAnimationURI,
      pointUpAnimationURI
    );
  }

  initializeAnimations(
    idleAnimation,
    walkAnimation,
    stickUpAnimation,
    pointUpAnimation
  ) {
    console.log(pointUpAnimation);
    this.animationController.addAnimation("Idle", idleAnimation, 3, 360);
    this.animationController.addAnimation("Walk", walkAnimation, 3, 360);
    this.animationController.addAnimation("Stick", stickUpAnimation, 4, 200);
    this.animationController.addAnimation("Point", pointUpAnimation, 3, 160);
    this.animationController.playAnimation("Idle"); // Start with idle animation
  }

  toggleDirection() {
    this.velocity.x *= -1; // Reverse direction
    this.direction *= -1; // Flip rendering direction
  }

  updatePosition() {
    // Apply gravity when the sprite is in the air
    if (!this.isOnGround) {
      this.velocity = this.velocity.add(this.gravity);
    }

    // Update position based on velocity if only hes not hovered and not alerted
    if (!this.isHovered && !this.isAlerted) {
      this.position = this.position.add(this.velocity);
    }
    // Reverse direction at canvas edges if on the ground
    if (
      this.position.x <= 0 ||
      this.position.x + this.size.x >= this.canvasWidth
    ) {
      this.toggleDirection();
    }
    // if direction not right when showing alert it will get handled
    if (this.isAlerted) {
      if (this.position.x > this.canvasWidth / 2 - 40 && this.direction === 1) {
        // 1 means hes looking to right and - 40 is bias for canvas size
        this.toggleDirection();
      }
      if (
        this.position.x < this.canvasWidth / 2 - 40 &&
        this.direction === -1
      ) {
        // -1 means hes looking to left
        this.toggleDirection();
      }
    }
    // Check for ground collision
    this.checkGroundCollision();
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
    if (this.isHovered && !this.isAlerted) {
      this.animationController.playAnimation("Idle");
      return;
    }
    if (this.isAlerted) {
      this.animationController.playAnimation("Point");
      return;
    }

    this.animationController.playAnimation("Walk");
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
