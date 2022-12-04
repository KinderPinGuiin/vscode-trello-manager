import * as vscode from "vscode";
import TrelloManager from "./TrelloManager";
import { Configuration } from "./config/TrelloManagerConfig";

/**
 * The Trello user. It contains the user's information like his boards, his 
 * tasks...
 */
export default class TrelloUser {

  // Authentication information
  private _username: string = "";
  private _apiKey: string = "";
  private _apiToken: string = "";

  public constructor() {
    // Get the extension current configuration to refresh the user
    TrelloManager.refreshUser(this);
  }

  /**
   * Ask the user's information and authenticate him to the trello API.
   */
  public async authenticate(): Promise<void> {
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
        "Vous devez fournir un nom d'utilisateur, une clé d'API et un token "
        + "d'API"
      );
    }

    // Set the user credentials in configuration
    TrelloManager.setConfiguration(Configuration.Username, username);		
    TrelloManager.setConfiguration(Configuration.ApiKey, apiKey);		
    TrelloManager.setConfiguration(Configuration.ApiToken, apiToken);	
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get apiKey(): string {
    return this._apiKey;
  }

  public set apiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  public get apiToken(): string {
    return this._apiToken;
  }

  public set apiToken(apiToken: string) {
    this._apiToken = apiToken;
  }

}