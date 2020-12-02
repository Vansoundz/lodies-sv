import type { User } from "./user.model";

export interface Track {
  _id?: string;
  title?: string;
  lyrics?: string;
  artist?: User;
  visible?: boolean;
  type?: "track" | "beat" | "mix" | "podcast";
  comments?: string[];
  cover?: string;
  coverKey?: string;
  sourceKey?: string;
  source?: string;
  createdAt?: string;
  likes?: string[];
  plays?: {
    userId?: string;
    deviceId?: string;
  }[];
}
