import { getActiveSkin, isPremiumSkin } from './skin';

describe('skin config', () => {
  const originalSkin = process.env.NEXT_PUBLIC_SKIN;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SKIN = originalSkin;
  });

  it('defaults to default skin when unset', () => {
    delete process.env.NEXT_PUBLIC_SKIN;
    expect(getActiveSkin()).toBe('default');
    expect(isPremiumSkin()).toBe(false);
  });

  it('activates premium skin from env', () => {
    process.env.NEXT_PUBLIC_SKIN = 'premium';
    expect(getActiveSkin()).toBe('premium');
    expect(isPremiumSkin()).toBe(true);
  });
});
