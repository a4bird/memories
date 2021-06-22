import { Maybe, Scalars } from 'src/graphql/generated/types';

export type Photo = {
  filename: string;
  url: string;
  createdAt: Scalars['DateTime'];
};

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
  photos?: Maybe<Photo[]>;
};

export type AddAlbumDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: (album: Album) => void;
};

export type AddPhotoDialogProps = {
  albumId: number;
  open: boolean;
  handleClose: (sucessfulUploadedPhotos: Photo[]) => void;
};
