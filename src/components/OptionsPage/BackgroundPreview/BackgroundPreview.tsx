import type CSS from 'csstype';
import type { FC } from 'react';
import { BackgroundMedia } from '../../common/BackgroundMedia/BackgroundMedia';
import { backgroundPreview } from './BackgroundPreview.module.css';

export const BackgroundPreview: FC = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const styles: CSS.BackgroundPreviewProperties = {
    ['--screen-width']: screenWidth.toString(),
    ['--screen-height']: screenHeight.toString(),
  };

  return (
    <div className={backgroundPreview} style={styles}>
      <BackgroundMedia />
    </div>
  );
};
