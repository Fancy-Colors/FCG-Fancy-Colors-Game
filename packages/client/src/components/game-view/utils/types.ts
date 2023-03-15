type RawPath = {
  path: string;
  color: string;
  chosen: false;
  completed: boolean;
  id: string;
  colorId: number;
};

export type RawGameData = {
  numbers: RawPath;
  paths: RawPath[];
  gameId: string;
  tags: string[];
  size: number;
  preview: string;
  name: string;
};

export type Path = {
  path: Path2D;
  color: string;
  chosen: boolean;
  completed: boolean;
  id: string;
  colorId: number;
};

export type GameData = {
  numbers: Path;
  paths: Path[];
  gameId: string;
  tags: string[];
  size: number;
};

export type Color = {
  id: number;
  color: string;
  progress: number;
  items: number;
  completed: number;
};

export type GameCompletedData = Nullable<{
  gameData: GameData;
  movesHistory: string[];
  score: number;
  time: number;
}>;
