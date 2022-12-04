import * as vscode from 'vscode';
import TrelloUser from "./TrelloUser";
import TrelloManager from "./TrelloManager";

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.info("Trello Manager is now active");

  // Create the Trello manager instance and the Trello user
  const trelloManager = new TrelloManager();

  // Bind the extension's commands to a function
	// All the commands are defined in the package.json file
	let disposable = vscode.commands.registerCommand(
		`${TrelloManager.extensionId}.authenticate`, async () => {
      await trelloManager.authenticate();
    }
	);

  // Bind the extension's events
  vscode.workspace.onDidChangeConfiguration(() => {
    trelloManager.refreshUser(true);
  });  

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
