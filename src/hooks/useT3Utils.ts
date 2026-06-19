import { useRouter } from 'next/router';
import { useT3i18n } from './useT3i18n';

export const useT3Utils = () => {
  const router = useRouter();
  const { getPathWithLocale } = useT3i18n();

  const localePath = (path: string): string => getPathWithLocale(path);
  const redirect = (data: { redirectUrl: string }) => router.push(data.redirectUrl);

  return { localePath, redirect };
};
