const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
const frontendFileApi = process.env.NEXT_PUBLIC_FRONTEND_FILE_API || '/headless/fileadmin';
const backendBaseUrl = process.env.NEXT_PUBLIC_TYPO3_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || '';

function getOrigin(value: string): string {
  try {
    return new URL(value).origin;
  } catch {
    return backendBaseUrl.replace(/\/$/, '');
  }
}

export function normalizeFileUrl(publicUrl?: string | null): string {
  if (!publicUrl) {
    return '';
  }

  if (publicUrl.startsWith('data:') || publicUrl.startsWith('blob:')) {
    return publicUrl;
  }

  const backendOrigin = getOrigin(apiBaseUrl);
  const frontendFilePath = frontendFileApi.replace(/\/$/, '');

  if (/^https?:\/\//i.test(publicUrl)) {
    const url = new URL(publicUrl);
    const fileadminIndex = url.pathname.indexOf('/fileadmin/');

    if (fileadminIndex >= 0) {
      return `${backendOrigin}${frontendFilePath}${url.pathname.slice(fileadminIndex + '/fileadmin'.length)}${url.search}`;
    }

    return publicUrl;
  }

  const normalizedPath = publicUrl.startsWith('/') ? publicUrl : `/${publicUrl}`;

  if (normalizedPath.startsWith('/fileadmin/')) {
    return `${backendOrigin}${frontendFilePath}${normalizedPath.replace('/fileadmin', '')}`;
  }

  if (normalizedPath.startsWith(frontendFilePath)) {
    return `${backendOrigin}${normalizedPath}`;
  }

  return `${backendOrigin}${normalizedPath}`;
}
