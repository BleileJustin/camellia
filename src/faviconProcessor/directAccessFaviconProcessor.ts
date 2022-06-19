import type { Favicon } from './favicon';
import type { FaviconProcessor } from './faviconProcessor';

export const directAccessFaviconProcessor: FaviconProcessor = {
  generateUrl: (url: string): Favicon => {
    const parsedUrl = new URL(url);

    return {
      default: {
        url: `${parsedUrl.origin}/favicon.ico`,
        dpi: 1,
      },
      variants: [
        {
          url: `${parsedUrl.origin}/favicon.ico`,
          dpi: 1,
        },
      ],
    };
  },
};
