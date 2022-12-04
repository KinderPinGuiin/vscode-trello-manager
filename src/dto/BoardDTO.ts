import LimitsDTO from "./LimitsDTO";
import PrefsDTO from "./PrefsDTO";

/**
 * Represents the Trello Board object.
 */
export default class BoardDTO {
  id?: string;
  name?: string;
  desc?: string;
  descData?: string;
  closed?: boolean;
  idMemberCreator?: string;
  idOrganization?: string;
  pinned?: boolean;
  url?: string;
  shortUrl?: string;
  prefs?: PrefsDTO;
  labelNames?: object;
  limits?: LimitsDTO;
  starred?: boolean;
  memberships?: string;
  shortLink?: string;
  subscribed?: boolean;
  powerUps?: string;
  dateLastActivity?: string;
  dateLastView?: string;
  idTags?: string;
  datePluginDisable?: string;
  creationMethod?: string;
  ixUpdate?: number;
  templateGallery?: string;
  entrepriseOwned?: boolean;
}