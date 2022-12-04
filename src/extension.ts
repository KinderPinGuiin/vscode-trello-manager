import * as vscode from 'vscode';
import axios from 'axios';

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.info("Trello Manager is now active");

	// All the commands are defined in the package.json file
	let disposable = vscode.commands.registerCommand(
		'trello-manager.authenticate', 
		async () => {
			// Ask the user information
			const username = await vscode.window.showInputBox({
				title: "Entrez votre nom d'utilisateur",
				ignoreFocusOut: true
			});
			const apiKey = await vscode.window.showInputBox({
				title: "Entrez votre clé d'API",
				ignoreFocusOut: true
			});
			const apiToken = await vscode.window.showInputBox({
				title: "Entrez votre token d'API",
				ignoreFocusOut: true
			});

			// Check the user input
			if (
				username === undefined 
				|| apiKey === undefined 
				|| apiToken === undefined
			) {
				vscode.window.showErrorMessage(
					"Vous devez fournir un nom d'utilisateur, une clé et un "
					+ "token d'API"
				);
			}

			// Set the user credentials in configuration
			const config = vscode.workspace.getConfiguration("trello-manager");
			config.update("username", username, vscode.ConfigurationTarget.Global);		
			config.update("apiKey", apiKey, vscode.ConfigurationTarget.Global);		
			config.update("apiToken", apiToken, vscode.ConfigurationTarget.Global);		
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
