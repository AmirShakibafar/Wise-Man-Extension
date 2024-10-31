class DialogBox {
  constructor() {
    this.dialogBox = document.createElement("div");
    this.dialogBox.style.display = "none"; // Initially hidden
    this.dialogBox.style.position = "fixed"; // Fixed position relative to the viewport
    this.dialogBox.style.background = "rgba(0, 0, 0, 0.7)";
    this.dialogBox.style.color = "white";
    this.dialogBox.style.padding = "10px"; // Increased padding for better visibility
    this.dialogBox.style.borderRadius = "5px";
    this.dialogBox.style.minWidth = "200px";
    this.dialogBox.style.left = "50%"; // Center it horizontally
    this.dialogBox.style.transform = "translateX(-50%)"; // Adjust for centering
    document.body.appendChild(this.dialogBox); // Append dialog to the body

    this.dialogContent = document.createElement("span");
    this.dialogBox.appendChild(this.dialogContent);
  }

  show(message) {
    this.dialogContent.textContent = message;
    this.position(); // Call position without arguments
    this.dialogBox.style.display = "block"; // Show the dialog
  }

  hide() {
    this.dialogBox.style.display = "none"; // Hide the dialog
  }

  position() {
    this.dialogBox.style.top = `0px`; // Set y position to the top of the viewport
  }
}
