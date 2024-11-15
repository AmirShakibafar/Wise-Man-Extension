const vscode = require("vscode");

class MyTextViewProvider {
  resolveWebviewView(webviewView) {
    webviewView.webview.options = { enableScripts: true };

    // Create URIs for scripts
    const scriptFiles = [
      "main.js",
      "wiseMan.js",
      "animationController.js",
      "spriteAnimation.js",
      "vector.js",
      "rectangle.js",
      "Alerts.js",
      "shuffle.js",
    ].map((file) =>
      vscode.Uri.joinPath(vscode.Uri.file(__dirname), "src", file)
    );

    const [
      mainURI,
      wiseManURI,
      animationControllerURI,
      spriteAnimationURI,
      vectorURI,
      rectangleURI,
      dialogBoxURI,
      shuffleURI,
    ] = scriptFiles.map((file) => webviewView.webview.asWebviewUri(file));

    // Create URIs for animation assets
    const animationAssets = [
      "Idle.png",
      "Walk.png",
      "PointUp.png",
      "StickUp.png",
    ].map((asset) =>
      webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(
          vscode.Uri.file(__dirname),
          "assets",
          "animations",
          asset
        )
      )
    );

    console.log(animationAssets);
    const [
      idleAnimationURI,
      walkAnimationURI,
      pointUpAnimationURI,
      stickUpAnimationURI,
    ] = animationAssets;

    // Create URIs for JSON
    const jsonFiles = ["filteredQuotes.json"].map((asset) =>
      webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(vscode.Uri.file(__dirname), "assets", asset)
      )
    );
    const [quotesURI] = jsonFiles;

    // Create URIs for GIFs
    const gifFiles = [
      "eye_gif.gif",
      "drink-water.gif",
      "hood-irony-hood.gif",
    ].map((asset) =>
      webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(vscode.Uri.file(__dirname), "assets", "gifs", asset)
      )
    );
    const [eyeGif, waterGif, walkGif] = gifFiles;

    // create script list that can be called before main with no problem to add files dynamically
    const scripts = [
      dialogBoxURI,
      vectorURI,
      rectangleURI,
      spriteAnimationURI,
      animationControllerURI,
      wiseManURI,
      shuffleURI,
    ];
    // Set the HTML content for the webview
    webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }
                canvas {
                    display: block;
                }
            </style>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cyberpunk</title>
        </head>
        <body>
            ${scripts
              .map((scriptURI) => `<script src="${scriptURI}"></script>`)
              .join("")}  
            <script>
                const idleAnimationURI = "${idleAnimationURI}";
                const walkAnimationURI = "${walkAnimationURI}";
                const stickUpAnimationURI = "${stickUpAnimationURI}";
                const pointUpAnimationURI = "${pointUpAnimationURI}";
                const sprite = new WiseMan(new Vector2(0, 0), new Vector2(32, 40), 2, innerWidth, idleAnimationURI, walkAnimationURI, stickUpAnimationURI, pointUpAnimationURI);
                const alertHandelSystem = new AlertHandleSystem("${walkGif}", "${eyeGif}", "${waterGif}");
                window.quotesArray = []; // Expose the quotesArray globally
                const readQuotesFromFile = async () => {
                    const response = await fetch("${quotesURI}"); // Fetch the JSON file
                    const quotesData = await response.json(); // Parse JSON
                    window.quotesArray = quotesData.quotes; // Expose quotesArray to global scope
                }
            </script>
            <script src="${mainURI}"></script>
        </body>
        </html>
        `;
  }
}

function activate(context) {
  const provider = new MyTextViewProvider();
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("myTextView", provider)
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
