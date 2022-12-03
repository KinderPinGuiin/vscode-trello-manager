import * as vscode from 'vscode';

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.info("Trello Manager is now active");

	// All the commands are defined in the package.json file
	let disposable = vscode.commands.registerCommand('trello-manager.init', () => {
		vscode.window.showInformationMessage('Trello Manager has been called');
	});

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
