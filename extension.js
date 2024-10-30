const vscode = require("vscode");

class MyTextViewProvider {
    resolveWebviewView(webviewView) {
        webviewView.webview.options = { enableScripts: true };

        // Create URIs for scripts
        const scriptFiles = [
            "main.js",
            "wiseMan.js", // Update if your main class file is named 'wiseMan.js'
            "animationController.js",
            "spriteAnimation.js",
            "vector.js",
            "rectangle.js"
        ].map(file => vscode.Uri.joinPath(vscode.Uri.file(__dirname), file));

        const [mainURI, wiseManURI, animationControllerURI, spriteAnimationURI, vectorURI, rectangleURI] = scriptFiles.map(file => webviewView.webview.asWebviewUri(file));

        // Create URIs for animation assets
        const animationAssets = [
            "Biker_idle.png",
            "Biker_run.png",
            "Biker_jump.png"
        ].map(asset => webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(vscode.Uri.file(__dirname), "assets", asset)
        ));

        const [idleAnimationURI, runAnimationURI, jumpAnimationURI] = animationAssets;

        // Set the HTML content for the webview
        webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                body {
                    margin: 0;
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
            <script src="${vectorURI}"></script>
            <script src="${rectangleURI}"></script>
            <script src="${spriteAnimationURI}"></script>
            <script src="${animationControllerURI}"></script>
            <script src="${wiseManURI}"></script>
            <script>
                const idleAnimationURI = "${idleAnimationURI}";
                const runAnimationURI = "${runAnimationURI}";
                const jumpAnimationURI = "${jumpAnimationURI}";
                const sprite = new WiseMan(new Vector2(0, 0), new Vector2(32, 40), 2, innerWidth, idleAnimationURI, runAnimationURI, jumpAnimationURI);
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
