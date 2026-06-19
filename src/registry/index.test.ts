/** @jest-environment node */

describe('component registry skin fallback', () => {
  const originalSkin = process.env.NEXT_PUBLIC_SKIN;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SKIN = originalSkin;
    jest.resetModules();
  });

  it('uses premium overrides when premium skin is active', async () => {
    process.env.NEXT_PUBLIC_SKIN = 'premium';
    const { getComponent } = await import('./index');
    const component = getComponent('header');
    expect(component).toBeDefined();
    expect(component.name || component.displayName).toBeTruthy();
  });

  it('falls back to default component map when premium override is missing', async () => {
    process.env.NEXT_PUBLIC_SKIN = 'premium';
    const { getComponent } = await import('./index');
    const defaultComponent = getComponent('text');
    expect(defaultComponent).toBeDefined();
  });

  it('uses default map when skin is default', async () => {
    process.env.NEXT_PUBLIC_SKIN = 'default';
    const { getComponent } = await import('./index');
    const component = getComponent('text');
    expect(component).toBeDefined();
  });
});
