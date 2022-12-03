import { getActiveTransaction } from '@sentry/tracing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { UnsplashState } from '../../store/slice/unsplashSlice';
import { unsplashSlice } from '../../store/slice/unsplashSlice';
import type { UnsplashPhoto } from './common';
import { getRandomUnsplashPhotoFromCollection } from './index';

export const useRandomPhotoFromUnsplashCollection = (collectionId: string): UnsplashPhoto | undefined => {
  const unsplashPhotoState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  const dispatch = useDispatch();

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useRandomPhotoFromUnsplashCollection',
    });

    const abortController = new AbortController();

    getRandomUnsplashPhotoFromCollection(collectionId, abortController.signal)
      .then((photo) => {
        span?.setStatus('ok');

        dispatch(unsplashSlice.actions.updatePhoto(photo));
      })
      .finally(() => {
        span?.finish();
      });

    return () => {
      abortController.abort();
    };
  }, [collectionId, dispatch]);

  return unsplashPhotoState.photo;
};

export const useUnsplashAttributions = (): UnsplashPhoto | undefined => {
  const unsplashPhotoState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  return unsplashPhotoState.photo;
};
