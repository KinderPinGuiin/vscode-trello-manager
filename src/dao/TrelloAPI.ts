import axios, { AxiosResponse, Method } from 'axios';
import BoardDTO from "../dto/BoardDTO";
import TrelloUser from '../TrelloUser';

/**
 * This class allows us to communicate with the Trello API. It contains many 
 * methods associated to a specific URL, and returns the result.
 */
export default class TrelloAPI {
  
  private apiBase = "https://api.trello.com";

  constructor(
    private user: TrelloUser
  ) {};

  public async getUserBoards(): Promise<Array<BoardDTO>> {
    return await this.doTrelloApiRequest(
      `/1/members/${this.user.username}/boards`
    );
  }

  private async doTrelloApiRequest(url: string, method: Method = "GET"): Promise<any> {
    let requestFunc: Function | null = null;
    if (method === "GET") {
      requestFunc = axios.get;
    } else if (method === "POST") {
      requestFunc = axios.put;
    } else if (method === "PUT") {
      requestFunc = axios.post;
    } else if (method === "DELETE") {
      requestFunc = axios.delete;
    }
    return (await requestFunc!(
      `${this.apiBase}${url}?key=${this.user.apiKey}&token=${this.user.apiToken}`,
      {
        "headers": {
          // eslint-disable-next-line
          Accept: "application/json"
        }
      }
    ) as AxiosResponse<any>).data;
  }

} 