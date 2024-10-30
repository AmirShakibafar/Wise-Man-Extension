class Rect2 {
  constructor(position, size) {
    // Initialize the rectangle's position and size
    this.position = position; // A Vector2 object representing the top-left corner of the rectangle
    this.size = size; // A Vector2 object representing the width (x) and height (y) of the rectangle
  }

  // Method to render (draw) the rectangle on the canvas
  render(color = "#707070") {
    // Begin the drawing path for the rectangle
    context.beginPath();

    // Set the fill color for the rectangle, default is gray
    context.fillStyle = color;

    // Define the rectangle's position and size
    context.rect(this.position.x, this.position.y, this.size.x, this.size.y);

    // Fill the rectangle with the selected color
    context.fill();

    // Close the drawing path
    context.closePath();
  }
}
