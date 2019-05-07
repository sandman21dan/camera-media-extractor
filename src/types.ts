export interface FileWithStats {
  fileName: string;
  size: number;
  birthtime: Date;
}

export interface FileWithCreated {
  fileName: string;
  created: Date;
}
