export interface User {
  accountType?: "fan" | "artist";
  albums?: any[];
  createdAt?: string;
  email?: string;
  image?: string;
  fans?: any[];
  playlists?: any[];
  tracks?: any[];
  username?: string;
  _id?: string;
}
