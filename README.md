# 2D Platformer Game

A simple 2D platformer game built using HTML5 canvas and JavaScript, featuring character animations, movement, jumping, and basic collision detection.

## Features

- **Player Movement**: Move the player left and right, jump, and trigger attacks using keyboard inputs.
- **Sprite Animations**: Idle, run, jump, and attack animations for the player character using a sprite sheet.
- **Physics**: Basic gravity and collision detection with the ground.
- **Responsive Canvas**: Adapts to the browser window size.

## Technologies Used

- **JavaScript**: For game logic, player movement, and animations.
- **HTML5 Canvas**: For rendering the game visuals.
- **Vector2**: A custom class for 2D vector math to handle positions and velocity.
- **Sprite Animation System**: Custom class to handle animations using sprite sheets.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Amzo2000/2D-Platformer-Game.git
   ```

2. Navigate to the project folder:

   ```bash
   cd 2D-Platformer-Game
   ```

3. Open `index.html` in your preferred web browser.

## How to Play

- Use the **arrow keys** for movement:
  - **Left Arrow**: Move left
  - **Right Arrow**: Move right
  - **Up Arrow**: Jump
- Press the **'A' key** to trigger an attack animation.

## File Structure

```
.
├── assets/                 # Sprite sheets and images
│   ├── [sprite_image.png]  # Example of a sprite image
├── vector.js               # 2D vector math class
├── player.js               # Player class and logic
├── rectangle.js            # Ground/Rect object class
├── spriteAnimation.js      # Sprite animation class
├── animationController.js  # Animation controller for the player
├── index.html              # Entry point of the game
└── README.md               # Project documentation
```

## Future Enhancements

- **Additional Levels**: Expand the game with more levels and obstacles.
- **Enhanced Enemy AI**: Add enemies with basic AI and interaction with the player.
- **Power-ups**: Introduce power-ups for the player.
- **Score System**: Add a scoring system to track player progress.

## Contributing

Feel free to open issues or submit pull requests with improvements, suggestions, or bug fixes!
