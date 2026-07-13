import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';
import { buildCacheTags } from './cache';

export function revalidateTypo3Path(path: string): void {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  revalidatePath(normalizedPath === '//' ? '/' : normalizedPath);
  for (const tag of buildCacheTags(normalizedPath)) {
    revalidateTag(tag);
  }
}
