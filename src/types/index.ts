export interface Container {
  width: number;
  height: number;
}

export interface Block {
  top: number;
  left: number;
  zIdnex: number;
  key: string;
  alignCenter?: boolean;
  focus?: boolean;
}

export interface EditorData {
  container: Container;
  blocks: Block[];
}

export interface IFoucsData {
  foucs: Block[];
  unFoucs: Block[];
}
