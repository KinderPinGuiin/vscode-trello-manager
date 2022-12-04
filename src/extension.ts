import * as vscode from 'vscode';
import TrelloUser from "./TrelloUser";
import TrelloManager from "./TrelloManager";

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.info("Trello Manager is now active");
  const user = new TrelloUser();

  // Bind the commands to a function
	// All the commands are defined in the package.json file
	let disposable = vscode.commands.registerCommand(
		`${TrelloManager.extensionId}.authenticate`, user.authenticate
	);

  // Bind extension events
  vscode.workspace.onDidChangeConfiguration(() => {
    TrelloManager.refreshUser(user);
  });

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
