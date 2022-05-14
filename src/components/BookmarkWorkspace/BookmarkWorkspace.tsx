import type { FC } from 'react';
import s from './BookmarkWorkspace.module.css';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import classNames from 'classnames';
import { useBookmarksBarChildren, useOtherBookmarksChildren } from '../../api/bookmark/hook';
import { useSelector } from 'react-redux';
import type { Bookmark } from '../../api/bookmark/common';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import type { RootState } from '../../store';
import type { BookmarkSearchState } from '../../store/slice/bookmarkSearchSlice';

export const BookmarkWorkspace: FC = () => {
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);

  const [bookmarksBarChildren] = useBookmarksBarChildren();
  const [otherBookmarksChildren] = useOtherBookmarksChildren();

  const mainClasses = classNames(s.bookmarkWorkspace, {
    [s.bookmarkWorkspaceLoading]: bookmarksBarChildren === undefined || otherBookmarksChildren === undefined,
  });

  const bookmarkCategories: Array<{ bookmarks: Array<Bookmark>; title: string }> = [];

  if (bookmarkSearchState.isActive) {
    bookmarkCategories.push({
      title: 'Search results',
      bookmarks: bookmarkSearchState.bookmarks,
    });
  } else {
    if (bookmarksBarChildren !== undefined && bookmarksBarChildren.length > 0) {
      bookmarkCategories.push({
        title: 'Bookmarks bar',
        bookmarks: bookmarksBarChildren,
      });
    }

    if (otherBookmarksChildren !== undefined && otherBookmarksChildren.length > 0) {
      bookmarkCategories.push({
        title: 'Other bookmarks',
        bookmarks: otherBookmarksChildren,
      });
    }
  }

  return (
    <main className={mainClasses}>
      <BookmarkSearch />
      {bookmarkCategories.map((bookmarkCategory, index) => {
        return (
          <BookmarkCategory bookmarks={bookmarkCategory.bookmarks} categoryTitle={bookmarkCategory.title} key={index} />
        );
      })}
    </main>
  );
};
