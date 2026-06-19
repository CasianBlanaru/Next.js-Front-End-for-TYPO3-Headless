/** @jest-environment node */

import { isDevToolsEnabled } from './devtoolsConfig';

describe('isDevToolsEnabled', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalFlag = process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS;

  afterEach(() => {
    (process.env as NodeJS.ProcessEnv & { NODE_ENV?: string }).NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS = originalFlag;
  });

  it('is disabled in production by default', () => {
    (process.env as NodeJS.ProcessEnv & { NODE_ENV?: string }).NODE_ENV = 'production';
    delete process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS;
    expect(isDevToolsEnabled()).toBe(false);
  });

  it('can be enabled explicitly in production', () => {
    (process.env as NodeJS.ProcessEnv & { NODE_ENV?: string }).NODE_ENV = 'production';
    process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS = 'true';
    expect(isDevToolsEnabled()).toBe(true);
  });

  it('is enabled in development by default', () => {
    (process.env as NodeJS.ProcessEnv & { NODE_ENV?: string }).NODE_ENV = 'development';
    delete process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS;
    expect(isDevToolsEnabled()).toBe(true);
  });

  it('can be disabled in development', () => {
    (process.env as NodeJS.ProcessEnv & { NODE_ENV?: string }).NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS = 'false';
    expect(isDevToolsEnabled()).toBe(false);
  });
});
