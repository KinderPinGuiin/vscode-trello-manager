import * as vscode from "vscode";
import TrelloManager from "./TrelloManager";
import { Settings } from "./config/Settings";
import BoardDTO from "./dto/BoardDTO";

/**
 * The Trello user. It contains the user's information like his boards, his 
 * tasks...
 */
export default class TrelloUser {

  /*
   * Authentication information
   */

  private _username: string = "";
  private _apiKey: string = "";
  private _apiToken: string = "";

  /* 
   * User's data
   */

  private _boards: Array<BoardDTO> = [];

  /**
   * Ask the user's information and authenticate him to the trello API.
   * 
   * @returns True if the user input was correct (Syntax), false otherwise.
   */
  public async authenticate(): Promise<boolean> {
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
      return false;
    }

    // Set the user credentials in configuration
    TrelloManager.setConfiguration(Settings.Username, username);		
    TrelloManager.setConfiguration(Settings.ApiKey, apiKey);		
    TrelloManager.setConfiguration(Settings.ApiToken, apiToken);
    
    return true;
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

  public set boards(boards: Array<BoardDTO>) {
    this._boards = boards;
  }

  public get boards(): Array<BoardDTO> {
    return this._boards;
  }

  public set apiToken(apiToken: string) {
    this._apiToken = apiToken;
  }

}