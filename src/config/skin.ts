export type SkinName = 'default' | 'premium' | 'custom' | string;

export function getActiveSkin(): SkinName {
  return process.env.NEXT_PUBLIC_SKIN?.trim() || 'default';
}

export function isPremiumSkin(): boolean {
  return getActiveSkin() === 'premium';
}
