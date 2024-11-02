class Vector2 {
  // Constructor to initialize a 2D vector with x and y components
  constructor(x, y) {
    this.x = x; // X-coordinate of the vector
    this.y = y; // Y-coordinate of the vector
  }

  // Method to add another vector to this vector
  add(vector) {
    // Returns a new Vector2 with the sum of the corresponding components
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  // Method to multiply the vector by a scalar value 'n'
  mul(n) {
    // Returns a new Vector2 with both components multiplied by 'n'
    return new Vector2(this.x * n, this.y * n);
  }
}
