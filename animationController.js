class AnimationController {
    constructor(spriteSize) {
        this.frameSize = new Vector2(48, 48);
        this.spriteOffset = new Vector2(-10, 0);
        this.spriteSize = spriteSize;
        this.animations = {};
        this.currentAnimation = null;
        this.currentAnimationName = "";
    }

    addAnimation(name, src, frameCount, frameDuration, loop = true, animationLocked = false) {
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

    playAnimation(name, overrideAnimation = false) {
        if (!this.animations[name]) {
            console.warn(`Animation "${name}" does not exist.`);
            return;
        }

        if (this.currentAnimation?.animationLocked && this.currentAnimation.isAnimating && !overrideAnimation) return;

        if (name === this.currentAnimationName && !this.currentAnimation.animationLocked) return;

        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }

        this.currentAnimationName = name;
        this.currentAnimation = this.animations[name];
        this.currentAnimation.start();
    }

    draw(pos, direction = 1) {
        if (this.currentAnimation) {
            this.currentAnimation.setDirection(direction);
            this.currentAnimation.setPos(pos);
            this.currentAnimation.draw();
        }
    }

    stopAnimation() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation = null;
        }
    }

    isAnimating() {
        return this.currentAnimation ? this.currentAnimation.isAnimating : false;
    }
}
