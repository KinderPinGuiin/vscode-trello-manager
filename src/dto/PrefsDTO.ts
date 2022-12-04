import ImageDescriptorDTO from "./ImageDescriptorDTO";

/**
 * CardAging value enumeration.
 */
type CardAging = "pirate" | "regular";

/**
 * Represents the Trello Prefs object.
 */
export default class PrefsDTO {
  permissionLevel?: string;
  hideVotes?: boolean;
  voting?: string;
  comments?: string;
  invitations?: any;
  selfJoin?: boolean;
  cardCovers?: boolean;
  isTemplate?: boolean;
  cardAging?: CardAging;
  calendarFeedEnabled?: boolean;
  background?: string;
  backgroundImage?: string;
  backgroundImageScaled?: Array<ImageDescriptorDTO>;
  backgroundTile?: boolean;
  backgroundBrightness?: string;
  backgroundBottomColor?: string;
  backgroundTopColor?: string;
  canBePublic?: boolean;
  canBeEntreprise?: boolean;
  canBeOrg?: boolean;
  canBePrivate?: boolean;
  canInvite?: boolean;
}