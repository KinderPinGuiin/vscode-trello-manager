import * as vscode from 'vscode';
import TrelloUser from './TrelloUser';

/**
 * The TrelloManager extension main class. It allows us to access configuration,
 * make trello API operations...
 */
export default class TrelloManager {

  public static extensionId: string = "trello-manager";

  /**
   * Returns the value of the asked configuration key.
   * 
   * @param key The configuration key.
   * @returns   The value associated to the key.
   */
  public static getConfiguration(key: string): string | undefined {
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
  public static setConfiguration(key: string, value: any): void {
    vscode.workspace
      .getConfiguration(TrelloManager.extensionId)
      .update(key, value, vscode.ConfigurationTarget.Global);
  }

  /**
   * Refresh the user configuration.
   * 
   * @param user The user that you want to refresh.
   */
  public static refreshUser(user: TrelloUser): void {
    user.username = TrelloManager.getConfiguration("username") ?? "";
    user.apiKey = TrelloManager.getConfiguration("apiKey") ?? "";
    user.apiToken = TrelloManager.getConfiguration("apiToken") ?? "";
  }

}