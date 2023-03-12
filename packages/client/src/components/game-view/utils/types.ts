type RawPathType = {
  path: string;
  color: string;
  chosen: false;
  completed: boolean;
  id: string;
  colorId: number;
};

export type RawGameDataType = {
  numbers: RawPathType;
  paths: RawPathType[];
  gameId: string;
  tags: string[];
  size: number;
  preview: string;
  name: string;
};

export type TPath = {
  path: Path2D;
  color: string;
  chosen: boolean;
  completed: boolean;
  id: string;
  colorId: number;
};

export type ColorType = {
  id: number;
  color: string;
  progress: number;
  items: number;
  completed: number;
};

export type TGameData = {
  numbers: TPath;
  paths: TPath[];
  gameId: string;
  tags: string[];
  size: number;
};

export type GameCompletedData = Nullable<{
  gameData: TGameData;
  movesHistory: string[];
  score: number;
  time: string;
}>;
