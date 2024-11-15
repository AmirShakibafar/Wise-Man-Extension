class DialogBox {
  constructor() {
    this.dialogBox = document.createElement("div");
    this.dialogBox.style.display = "none";
    this.dialogBox.style.position = "fixed"; // Fixed position relative to the viewport
    this.dialogBox.style.background = "rgba(0, 67, 70, 0.763)";
    this.dialogBox.style.color = "#fafafa";
    this.dialogBox.style.padding = "10px";
    this.dialogBox.style.margin = "10px 0";
    this.dialogBox.style.borderRadius = "5px";
    this.dialogBox.style.maxWidth = "300px";
    this.dialogBox.style.minWidth = "200px";
    this.dialogBox.style.fontWeight = "bold";
    this.dialogBox.style.left = "50%";
    this.dialogBox.style.transform = "translateX(-50%)";
    this.dialogBox.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    this.dialogBox.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)"; // Add box shadow
    document.body.appendChild(this.dialogBox);

    this.dialogContent = document.createElement("span");
    this.dialogBox.appendChild(this.dialogContent);
  }

  show(message) {
    this.dialogContent.textContent = message;
    this.dialogBox.style.display = "flex";
    requestAnimationFrame(() => {
      this.dialogBox.style.opacity = "1";
      this.dialogBox.style.transform = "translate(-50%, 0)";
    });
  }

  hide() {
    this.dialogBox.style.opacity = "0";
    this.dialogBox.addEventListener(
      "transitionend",
      () => {
        this.dialogBox.style.display = "none";
      },
      { once: true }
    );
  }

  showHoverDialog(message) {
    if (message) {
      this.show(message); 
    } else {
      this.hide(); 
    }
  };
}

// Extend DialogBox for Alerts
class AlertBox extends DialogBox {
  constructor(imageSrc, message, callback) {
    super();
    this.dialogBox.innerHTML = ""; // Clear previous content
    this.dialogBox.style.flexDirection = "column";
    this.dialogBox.style.alignItems = "center";

    // Create image element
    this.image = document.createElement("img");
    this.image.src = imageSrc;
    this.image.style.width = "40px";
    this.image.style.height = "fit-content";
    this.image.style.display = "block";
    this.dialogBox.appendChild(this.image);

    // Create message element
    this.message = document.createElement("div");
    this.message.textContent = message;
    this.message.style.textAlign = "center";
    this.message.style.maxWidth = "200px";
    this.dialogBox.appendChild(this.message);

    // Create confirm button
    this.confirmButton = document.createElement("button");
    this.confirmButton.textContent = "Will Do!";
    this.confirmButton.style.backgroundColor = "#172A3A";
    this.confirmButton.style.color = "#fafafa";
    this.confirmButton.style.padding = "5px";
    this.confirmButton.style.borderRadius = "10px";
    this.confirmButton.style.border = "2px solid #fff";
    this.confirmButton.style.cursor = "pointer";
    this.confirmButton.style.marginTop = "10px";
    this.confirmButton.style.transition = "all 0.3s ease";
    this.confirmButton.style.fontSize = "10px";

    // Add hover effect with JavaScript events
    this.confirmButton.addEventListener("mouseenter", () => {
      this.confirmButton.style.backgroundColor = "#fafafa";
      this.confirmButton.style.color = "#172A3A";
      this.confirmButton.style.transform = "scale(1.1)";
    });

    this.confirmButton.addEventListener("mouseleave", () => {
      this.confirmButton.style.backgroundColor = "#172A3A";
      this.confirmButton.style.color = "#fafafa";
      this.confirmButton.style.transform = "scale(1)";
    });

    this.confirmButton.onclick = () => this.confirm(); // Bind confirm function
    this.dialogBox.appendChild(this.confirmButton);

    this.callback = callback;
  }

  confirm() {
    if (this.callback) {
      this.callback();
    }
    this.hide();
  }
}

class AlertManager {
  constructor() {
    this.alertQueue = [];
    this.isShowing = false;
  }

  search(alert) {
    this.alertQueue.forEach((obj) => {
      if (obj.alertBox === alert) {
        return true;
      }
    });
    return false;
  }

  enqueue(alertBox, displayTime) {
    this.alertQueue.push({ alertBox, displayTime });
    this.processQueue();
  }

  processQueue() {
    if (this.isShowing || this.alertQueue.length === 0) return;
    console.log("alert happens!");
    const { alertBox, displayTime } = this.alertQueue.shift();
    this.isShowing = true;

    alertBox.show();
    setTimeout(() => {
      alertBox.hide();
      this.isShowing = false;
      this.processQueue();
    }, displayTime);
  }
}

class AlertHandleSystem {
  constructor(walkGif, eyeGif, waterGif) {
    this.alertManager = new AlertManager();
    this.eyesAlert = new AlertBox(
      `${eyeGif}`,
      "look away for a minute will ya?",
      () => {
        console.log("hi"); // Callback action on confirm
      }
    );
    this.walkAlert = new AlertBox(
      `${walkGif}`,
      "you've been coding a lot go for a walk!",
      () => {
        console.log("User confirmed!"); // Callback action on confirm
      }
    );
    this.walkAlert.image.style.height = "45px";

    this.waterAlert = new AlertBox(
      `${waterGif}`,
      "why dont you have some water?",
      () => {
        console.log("User confirmed!"); // Callback action on confirm
      }
    );
    this.waterAlert.image.style.height = "45px";
  }
  isAlertShowing() {
    return this.alertManager.isShowing;
  }
  start() {
    // timings are not correct its for test only
    setInterval(() => {
      if (!this.alertManager.search(this.waterAlert)) {
        this.alertManager.enqueue(this.waterAlert, 2000); // Queue water alert every 10 seconds for testing
      }
    }, 10000);

    setInterval(() => {
      if (!this.alertManager.search(this.walkAlert)) {
        this.alertManager.enqueue(this.walkAlert, 2000); // Queue water alert every 30 seconds for testing
      }
    }, 20000);

    setInterval(() => {
      if (!this.alertManager.search(this.eyesAlert)) {
        this.alertManager.enqueue(this.eyesAlert, 2000); // Queue water alert every 10 seconds for testing
      }
    }, 5000);
  }
}
