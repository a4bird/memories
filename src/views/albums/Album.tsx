import React from 'react';
import { useParams } from 'react-router';

export const Album = () => {
  const { albumId } = useParams<{
    albumId: string;
  }>();
  return <div>Photo Album - {albumId}</div>;
};
