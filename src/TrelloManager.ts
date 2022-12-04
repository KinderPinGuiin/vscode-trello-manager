import * as vscode from 'vscode';
import TrelloUser from './TrelloUser';
import { Configuration } from "./config/TrelloManagerConfig";

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
  public static getConfiguration(key: Configuration): string | undefined {
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
  public static setConfiguration(key: Configuration, value: any): void {
    vscode.workspace
      .getConfiguration(TrelloManager.extensionId)
      .update(key, value, vscode.ConfigurationTarget.Global);
  }

  /**
   * Refresh the given Trello user.
   * 
   * @param user The user that you want to refresh.
   */
  public static refreshUser(user: TrelloUser): void {
    // Refresh user's configuration
    user.username = TrelloManager.getConfiguration(Configuration.Username) ?? "";
    user.apiKey = TrelloManager.getConfiguration(Configuration.ApiKey) ?? "";
    user.apiToken = TrelloManager.getConfiguration(Configuration.ApiToken) ?? "";
  }

}