class DialogBox {
  constructor() {
    this.dialogBox = document.createElement("div");
    this.dialogBox.style.display = "none"; // Initially hidden
    this.dialogBox.style.position = "absolute";
    this.dialogBox.style.background = "rgba(0, 0, 0, 0.7)";
    this.dialogBox.style.color = "white";
    this.dialogBox.style.padding = "5px";
    this.dialogBox.style.borderRadius = "5px";
    document.body.appendChild(this.dialogBox); // Append dialog to the body

    this.dialogContent = document.createElement("span");
    this.dialogBox.appendChild(this.dialogContent);
  }

  show(message, x, y) {
    this.dialogContent.textContent = message;
    this.position(x, y);
    this.dialogBox.style.display = "block"; // Show the dialog
  }

  hide() {
    this.dialogBox.style.display = "none"; // Hide the dialog
  }

  position(x, y) {
    this.dialogBox.style.left = `${x}px`; // Set x position
    this.dialogBox.style.top = `${y - 30}px`; // Set y position above
  }
}
