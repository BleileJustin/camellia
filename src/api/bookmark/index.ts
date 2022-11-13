import { faker } from '@faker-js/faker';
import * as Sentry from '@sentry/react';
import { AppPlatform, getPlatform } from '../appEnvironment';
import topWebsites from './assets/top-websites.json';
import type {
  CreateBookmark,
  InitializeRootFolders,
  GetBookmarksBarChildren,
  GetFolderChildrenBookmarks,
  GetOtherBookmarksChildren,
  SearchBookmarks,
  Bookmark,
  BookmarkId,
} from './common';
import {
  createChromiumBookmark,
  getChromiumBookmarksBarChildren,
  getChromiumFolderChildrenBookmarks,
  getChromiumOtherBookmarksChildren,
  initializeChromiumRootFolders,
  searchChromiumBookmarks,
} from './platform/chromium';
import {
  createWebBookmark,
  geWebBookmarksBarChildren,
  initializeWebRootFolders,
  getWebFolderChildrenBookmarks,
  getWebOtherBookmarksChildren,
  searchWebBookmarks,
} from './platform/web';
import {
  getWebextBookmarksBarChildren,
  getWebextFolderChildrenBookmarks,
  getWebextOtherBookmarksChildren,
  initializeWebextRootFolders,
} from './platform/webext';

export const getFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'getFolderChildrenBookmarks',
  });

  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      bookmarks = await getChromiumFolderChildrenBookmarks(folderBookmarkId);

      break;

    case AppPlatform.Webext:
      bookmarks = await getWebextFolderChildrenBookmarks(folderBookmarkId);

      break;

    case AppPlatform.Web:
      bookmarks = await getWebFolderChildrenBookmarks(folderBookmarkId);

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', bookmarks.length).finish();

  return bookmarks;
};

export const getBookmarksBarChildren: GetBookmarksBarChildren = async () => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'getBookmarksBarChildren',
  });

  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      bookmarks = await getChromiumBookmarksBarChildren();

      break;

    case AppPlatform.Webext:
      bookmarks = await getWebextBookmarksBarChildren();

      break;

    case AppPlatform.Web:
      bookmarks = await geWebBookmarksBarChildren();

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', bookmarks.length).finish();

  return bookmarks;
};

export const getOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'getOtherBookmarksChildren',
  });

  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      bookmarks = await getChromiumOtherBookmarksChildren();

      break;

    case AppPlatform.Webext:
      bookmarks = await getWebextOtherBookmarksChildren();

      break;

    case AppPlatform.Web:
      bookmarks = await getWebOtherBookmarksChildren();

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', bookmarks.length).finish();

  return bookmarks;
};

export const searchBookmarks: SearchBookmarks = async (searchQuery) => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'searchBookmarks',
  });

  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      bookmarks = await searchChromiumBookmarks(searchQuery);

      break;

    case AppPlatform.Webext:
      bookmarks = await searchWebBookmarks(searchQuery);

      break;

    case AppPlatform.Web:
      bookmarks = await searchWebBookmarks(searchQuery);

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', bookmarks.length).finish();

  return bookmarks;
};

export const createBookmark: CreateBookmark = async (bookmark) => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'createBookmark',
  });

  let createdBookmark: Bookmark;

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      createdBookmark = await createChromiumBookmark(bookmark);

      break;

    case AppPlatform.Webext:
      createdBookmark = await createWebBookmark(bookmark);

      break;

    case AppPlatform.Web:
      createdBookmark = await createWebBookmark(bookmark);

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', 1).finish();

  return createdBookmark;
};

const initializeRootFolders: InitializeRootFolders = async () => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'initializeRootFolders',
  });

  let bookmarks: Array<BookmarkId> = [];

  switch (getPlatform()) {
    case AppPlatform.Chromium:
      bookmarks = await initializeChromiumRootFolders();

      break;

    case AppPlatform.Webext:
      bookmarks = await initializeWebextRootFolders();

      break;

    case AppPlatform.Web:
      bookmarks = await initializeWebRootFolders();

      break;
  }

  span?.setStatus('ok').setData('bookmarks_amount', bookmarks.length).finish();

  return bookmarks;
};

export const generateDemoBookmarks = async (): Promise<void> => {
  const span = Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
    op: 'initializeRootFolders',
  });

  const folderIds = await initializeRootFolders();

  for (const topWebsite of topWebsites) {
    await createBookmark({
      type: 'link',
      title: topWebsite,
      parentId: faker.helpers.arrayElement(folderIds),
      url: `https://${topWebsite}`,
    });

    const shouldCreateFolder = faker.datatype.number({ min: 0, max: 100 }) >= 70;

    if (shouldCreateFolder) {
      const createdFolder = await createBookmark({
        type: 'folder',
        title: faker.commerce.productName(),
        parentId: faker.helpers.arrayElement(folderIds),
      });

      folderIds.push(createdFolder.id);
    }
  }

  span?.setStatus('ok').finish();
};
