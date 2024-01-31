export type FileType = Blob | MediaSource | null;

export type PreviewFileType = {
  id: number | string;
  image_path: string;
  file?: FileType;
};
