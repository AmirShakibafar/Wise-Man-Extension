class SpriteAnimation {
    constructor(src, frameSize, spriteSize, offset = new Vector2(0, 0), frameCount, frameDuration, loop = true, animationLocked = false) {
        this.pos = new Vector2(0, 0);
        this.spritesheet = new Image();
        this.frameSize = frameSize;
        this.offset = offset;
        this.spriteSize = spriteSize;
        this.frameCount = frameCount;
        this.frameDuration = frameDuration;
        this.currentFrame = 0;
        this.isAnimating = false;
        this.animationLocked = animationLocked;
        this.animationRequestId = null;
        this.isSpriteLoaded = false;
        this.direction = 1;
        this.loop = loop;
        this.lastFrameTime = 0;
        this.initSprite(src);
    }

    initSprite(src) {
        this.spritesheet.src = src;
        this.spritesheet.onload = () => this.isSpriteLoaded = true;
    }

    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentFrame = 0;
        this.lastFrameTime = performance.now();
        this.play();
    }

    setFrame(index) {
        this.currentFrame = index % this.frameCount;
    }

    setPos(pos) {
        this.pos = pos;
    }

    play() {
        if (!this.isAnimating) return;
        const now = performance.now();
        const elapsedTime = now - this.lastFrameTime;

        // Update frame if enough time has passed
        if (elapsedTime >= this.frameDuration) {
            this.lastFrameTime = now;
            if (this.loop) {
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            } else if (this.currentFrame < this.frameCount - 1) {
                this.currentFrame++;
            } else {
                this.stop();
                return;
            }
        }

        this.animationRequestId = requestAnimationFrame(() => this.play());
    }

    setDirection(direction) {
        this.direction = direction;
    }

    draw() {
        if (!this.isSpriteLoaded) return;

        const sx = this.offset.x + this.currentFrame * this.frameSize.x;
        const sy = this.offset.y;

        context.save();
        context.translate(this.pos.x + this.spriteSize.x / 2, this.pos.y + this.spriteSize.y / 2);
        context.scale(this.direction, 1);
        context.translate(-(this.pos.x + this.spriteSize.x / 2), -(this.pos.y + this.spriteSize.y / 2));
        context.drawImage(
            this.spritesheet,
            sx, sy, this.frameSize.x, this.frameSize.y,
            this.pos.x, this.pos.y, this.spriteSize.x, this.spriteSize.y
        );
        context.restore();
    }

    stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationRequestId);
        this.animationRequestId = null;
    }
}
