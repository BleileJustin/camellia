import type { FC } from 'react';
import { useOption } from '../../../../../api/options/hook';
import { PhotoFromUnsplashCollectionById } from '../PhotoFromUnsplashCollectionById';

export const PhotoFromUnsplashCollectionByIdFromOptions: FC<{
  onLoad: () => void;
}> = (props) => {
  const [backgroundImageUnsplashCollectionId] = useOption('background_image_unsplash_collection_id');

  if (backgroundImageUnsplashCollectionId === undefined) {
    return <></>;
  }

  const collectionId = backgroundImageUnsplashCollectionId.replace(
    /^https:\/\/unsplash\.com\/collections\/([0-9]+)/,
    '$1',
  );

  return <PhotoFromUnsplashCollectionById collectionId={collectionId} onLoad={props.onLoad} />;
};
