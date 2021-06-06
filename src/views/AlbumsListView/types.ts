export type Album = {
  id: string;
  createdAt: string;
  description: string;
  media: string;
  title: string;
  totalDownloads: string;
};

export type AddAlbumDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
};
