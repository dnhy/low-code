export interface Container {
  width: number;
  height: number;
}

export interface Block {
  top: number;
  left: number;
  zIdnex: number;
  key: string;
}

export interface EditorData {
  container: Container;
  blocks: Block[];
}
