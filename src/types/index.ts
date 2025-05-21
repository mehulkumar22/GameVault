export interface GameType {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  detailImageUrl?: string;
  heroImageUrl?: string;
  price: number;
  originalPrice?: number;
  discount: number;
  genre: string;
  platform: string;
  publisher?: string;
  developer?: string;
  releaseYear?: number;
  players?: string;
  isNew: boolean;
  loginCodes: LoginCode[];
  screenshots?: string[];
}

export interface LoginCode {
  id: string;
  username: string;
  password: string;
  isSold: boolean;
}

export interface FeaturedGame extends GameType {
  badge?: string;
  description: string;
}

export type GameTypes = {
  screenshots?: string[];
};
