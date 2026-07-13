import Image, { type ImageProps } from 'next/image';
import { normalizeFileUrl } from '@services/media';

type Typo3ImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export default function Typo3Image({ src, alt, ...props }: Typo3ImageProps) {
  const normalizedSrc = normalizeFileUrl(src);

  if (!normalizedSrc) {
    return null;
  }

  return <Image src={normalizedSrc} alt={alt || ''} {...props} />;
}
