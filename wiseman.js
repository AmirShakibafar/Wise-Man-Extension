class WiseMan {
    constructor(position, size, scale, canvasWidth, idleAnimationURI, runAnimationURI, jumpAnimationURI) {
        this.position = position;
        this.size = size.mul(scale);
        this.velocity = new Vector2(0.5, 0); // Start with a constant horizontal movement speed
        this.canvasWidth = canvasWidth;
        this.direction = 1;
        this.isOnGround = false;
        this.animationController = new AnimationController(this.size);
        this.initializeAnimations(idleAnimationURI, runAnimationURI, jumpAnimationURI);
    }

    initializeAnimations(idleAnimationURI, runAnimationURI, jumpAnimationURI) {
        this.animationController.addAnimation('Idle', idleAnimationURI, 4, 100);
        this.animationController.addAnimation('Run', runAnimationURI, 6, 100);
        this.animationController.addAnimation('Jump', jumpAnimationURI, 4, 100);
        this.animationController.playAnimation('Idle'); // Start with idle animation
    }

    checkGroundCollision() {
        // Check if the sprite bottom edge exceeds the ground's top edge
        if (this.position.y + this.size.y >= ground.position.y) {
            // Stop the sprite's downward movement
            this.velocity.y = 0; 
            
            // Place the sprite on top of the ground
            this.position.y = ground.position.y - this.size.y; 
            
            // Update the sprite's ground state
            this.isOnGround = true; 
        } else {
            this.isOnGround = false; 
        }
    }

    updatePosition() {
        // Apply gravity when the sprite is in the air
        if (!this.isOnGround) {
            this.velocity = this.velocity.add(new Vector2(0, 0.2)); // Apply gravity
        }

        // Update the sprite's position based on their velocity
        this.position = this.position.add(this.velocity);

        // Check for ground collision after updating position
        this.checkGroundCollision();

        // Reverse direction if sprite hits the canvas boundary and is on the ground
        if (this.isOnGround && (this.position.x <= 0 || this.position.x + this.size.x >= this.canvasWidth)) {
            this.velocity.x *= -1;  // Reverse direction
            this.direction *= -1;  // Flip the direction for rendering
        }
    }

    updateAnimationState() {
        // Ensure the sprite is in the 'Run' animation while moving
        if (this.isOnGround) {
            if (this.velocity.x !== 0) {
                this.animationController.playAnimation('Run');
            } else {
                this.animationController.playAnimation('Idle');
            }
        } else {
            this.animationController.playAnimation('Jump');
        }
    }

    render() {
        this.animationController.draw(this.position, this.direction);
    }

    update() {
        this.updatePosition();
        this.updateAnimationState();
        this.render();
    }
}
