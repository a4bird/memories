import { Scalars } from 'src/graphql/generated/types';

export type AlbumData = {
  id: string;
  createdAt: string;
  description: string;
  media: string;
  title: string;
  totalDownloads: string;
};

export type Album = {
  id: number;
  description: string;
  title: string;
  createdAt: Scalars['DateTime'];
};

export type AddAlbumDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
};
