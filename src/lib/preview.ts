export interface PreviewContext {
  enabled: boolean;
  query: Record<string, string>;
}

const PREVIEW_KEYS = ['ADMCMD_prev', 'ADMCMD_view', 'ADMCMD_editIcons', 'preview', 'previewToken', 'token'];

export function createPreviewContext(searchParams?: Record<string, string | string[] | undefined>): PreviewContext {
  const query: Record<string, string> = {};

  if (!searchParams) {
    return { enabled: false, query };
  }

  for (const key of PREVIEW_KEYS) {
    const value = searchParams[key];
    if (typeof value === 'string' && value.length > 0) {
      query[key] = value;
    }
  }

  return {
    enabled: Object.keys(query).length > 0,
    query,
  };
}

export function isPreviewMode(searchParams?: Record<string, string | string[] | undefined>): boolean {
  return createPreviewContext(searchParams).enabled;
}

export function buildPreviewQuery(preview?: PreviewContext): Record<string, string> | undefined {
  return preview?.enabled ? preview.query : undefined;
}
