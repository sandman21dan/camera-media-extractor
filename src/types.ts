export interface FileWithStats {
  fileName: string;
  size: number;
  birthtime: Date;
  isExif: boolean;
}

export interface FileWithCreated {
  fileName: string;
  created: Date;
}

export interface FileWithStatsAndDest extends FileWithStats {
  dest: string;
}
