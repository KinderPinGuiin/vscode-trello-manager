import * as vscode from 'vscode';
import TrelloUser from './TrelloUser';
import { Settings } from "./config/Settings";
import TrelloAPI from './dao/TrelloApi';

/**
 * The TrelloManager extension main class. It allows us to access configuration,
 * make trello API operations...
 */
export default class TrelloManager {

  public static extensionId: string = "trello-manager";

  private _user: TrelloUser = new TrelloUser();
  private _api?: TrelloAPI;

  constructor() {
    // Get the existing current user (If there is one)
    this.refreshUser();
  }

  /**
   * Refresh the authenticated Trello user.
   * 
   * @returns True if the refresh was fully executed, false otherwise.
   */
  public async refreshUser(calledByEvent: boolean = false): Promise<boolean> {
    // Refresh user's configuration
    this.user.username = TrelloManager.getConfiguration(Settings.Username) ?? "";
    this.user.apiKey = TrelloManager.getConfiguration(Settings.ApiKey) ?? "";
    this.user.apiToken = TrelloManager.getConfiguration(Settings.ApiToken) ?? "";

    // Check if the configuration is valid
    if (!calledByEvent && !this.isUserValid()) {
      vscode.window.showInformationMessage(
        "Trello Manager : Vous n'êtes pas authentifié à Trello."
      );
      return false;
    } else if (!this.isUserValid()) {
      // If this method is called by an event, we don't print message because 
      // the user is currently updating is configuration.
      return false;
    }

    // Load the user's data
    this.loadTrelloAPI();
    await this.loadUserData();

    console.log(this.user);

    return true;
  }

  public async authenticate() {
    // Authenticate the user and load his data
    const isInputValid = await this.user.authenticate();
    // Check if the user's input was valid
    if (!isInputValid) {
      vscode.window.showErrorMessage(
        "Trello Manager : Vous devez fournir un nom d'utilisateur, une clé "
        + "d'API et un token d'API"
      );
      return;
    }
  }

  public loadTrelloAPI() {
    this.api = new TrelloAPI(this.user);
  }

  public async loadUserData() {
    // Get the user's boards
    try {
      this.user.boards = await this.api!.getUserBoards();
    } catch (e: any) {
      if (e.response.status === 401) {
        vscode.window.showErrorMessage(
          "Trello Manager : Impossible de récupérer vos projets. Vos "
          + "identifiants sont incorrects."
        );
      }
    }
  }

  /**
   * Check if the configuration is filled.
   * 
   * @returns True if the configuration is filled, false otherwise.
   */
  private isUserValid(): boolean {
    return this.user.username !== "" 
      && this.user.apiKey !== "" 
      && this.user.apiToken !== "";
  }

  public get user(): TrelloUser {
    return this._user;
  }

  private get api(): TrelloAPI | undefined {
    return this._api;
  }

  private set api(api: TrelloAPI | undefined) {
    this._api = api;
  }

  /**
   * Returns the value of the asked configuration key.
   * 
   * @param key The configuration key.
   * @returns   The value associated to the key.
   */
  public static getConfiguration(key: Settings): string | undefined {
    return vscode
      .workspace
      .getConfiguration(TrelloManager.extensionId)
      .get(key);
  }
  
  /**
   * Set the configuration value associated to the given key.
   * 
   * @param key   The configuration key.
   * @param value The value you want to set.
   */
  public static setConfiguration(key: Settings, value: any): void {
    vscode.workspace
      .getConfiguration(TrelloManager.extensionId)
      .update(key, value, vscode.ConfigurationTarget.Global);
  }

}