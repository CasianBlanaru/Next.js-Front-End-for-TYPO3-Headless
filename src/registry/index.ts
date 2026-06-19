import React, { Suspense } from 'react';
import type { ComponentType } from 'react';
import componentMap from '@hooks/componentMap';
import ComponentErrorBoundary from '@components/layout/ComponentErrorBoundary';
import { getActiveSkin } from '../config/skin';
import PremiumHero from '../skins/premium/PremiumHero';
import PremiumNewsList from '../skins/premium/PremiumNewsList';
import PremiumCTA from '../skins/premium/PremiumCTA';

export interface RegistryOptions {
  skin?: string;
  fallback?: ComponentType<any>;
}

const skinOverrides: Record<string, Record<string, ComponentType<any>>> = {
  premium: {
    header: PremiumHero,
    news_list: PremiumNewsList,
    headless_news: PremiumNewsList,
    html: PremiumCTA,
  },
};

function resolveFromMap(
  map: Record<string, ComponentType<any>>,
  normalizedType: string,
  type: string,
): ComponentType<any> | undefined {
  return map[normalizedType] ?? map[type];
}

export const getComponent = (type: string, options: RegistryOptions = {}) => {
  const activeSkin = getActiveSkin();
  const { skin = activeSkin, fallback } = options;
  const normalizedType = type.toLowerCase().trim();

  if (skin === 'premium') {
    const premiumComponent = resolveFromMap(skinOverrides.premium, normalizedType, type);
    if (premiumComponent) {
      return premiumComponent;
    }
  } else if (skinOverrides[skin]) {
    const skinComponent = resolveFromMap(skinOverrides[skin], normalizedType, type);
    if (skinComponent) {
      return skinComponent;
    }
  }

  return (
    componentMap[normalizedType] ||
    componentMap[type] ||
    fallback ||
    componentMap.default
  );
};

export const DynamicComponentRenderer: React.FC<{
  type: string;
  props: any;
  options?: RegistryOptions;
}> = ({ type, props, options }) => {
  const Component = getComponent(type, options);
  if (!Component) {
    return React.createElement(
      'div',
      {
        className:
          'p-4 border border-dashed border-slate-300 text-slate-400 rounded-md text-sm italic',
      },
      `Component "${type}" not found.`,
    );
  }
  return React.createElement(
    ComponentErrorBoundary,
    null,
    React.createElement(
      Suspense,
      {
        fallback: React.createElement('div', {
          className: 'animate-pulse bg-slate-100 h-24 rounded-md',
        }),
      },
      React.createElement(Component, props),
    ),
  );
};
