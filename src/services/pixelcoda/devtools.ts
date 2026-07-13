import type { T3Page } from '@/types';
import { getPixelcodaMeta } from '@/lib/pixelcoda';

export function createDevtoolsPayload(pageData: T3Page) {
  const elements = Object.entries(pageData.content ?? {}).flatMap(([column, items]) =>
    items.map((item) => ({
      uid: item.id,
      type: item.type,
      colPos: item.colPos,
      column,
      appearance: item.appearance,
    })),
  );

  return {
    page: {
      id: pageData.id,
      slug: pageData.slug,
      title: pageData.title,
      languageCount: pageData.i18n?.length ?? 0,
    },
    layout: getPixelcodaMeta(pageData as unknown as Record<string, unknown>),
    elements,
  };
}
