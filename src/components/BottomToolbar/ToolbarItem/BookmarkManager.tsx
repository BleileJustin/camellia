import type { MouseEventHandler, VFC } from 'react';
import bookmarkStyles from '../../Bookmark/Bookmark.module.css';
import { Chip, ChipShape } from '../../Chip/Chip';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconStar = require('mdi/filled/star.svg?fill=%23eee');

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();
};

export const BookmarkManager: VFC = () => {
  const label = 'Bookmark manager';
  const tooltip = `${label} (Ctrl+Shift+O)`;
  const url = 'chrome://bookmarks';

  return (
    <a className={bookmarkStyles.bookmark} href={url} onClick={handleClick} rel="noopener" target="_self">
      <Chip inlineIcon={iconStar} label={label} loading={false} shape={ChipShape.Squared} tooltip={tooltip} />
    </a>
  );
};
