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
}

export interface EditorData {
  container: Container;
  blocks: Block[];
}
