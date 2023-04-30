/* eslint-disable @typescript-eslint/naming-convention */
export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type GameRaw = {
  gameId: string;
  tags: string[];
  preview: string;
  name: string;
};

export type GamesListDTO = GameRaw[];

export type Path = {
  path: string;
  color: string;
  chosen: false;
  completed: boolean;
  id: string;
  colorId: number;
};

export type GameDataDTO = {
  numbers: Path;
  paths: Path[];
  gameId: string;
  tags: string[];
  size: number;
  preview: string;
  name: string;
};
